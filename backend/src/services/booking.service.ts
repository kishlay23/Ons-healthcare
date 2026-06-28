import prisma from '../config/database'
import { NotFoundError, ValidationError } from '../utils/errors'

export class BookingService {
  async getAvailableSlots(therapistId: string, date: string) {
    const therapist = await prisma.therapist.findUnique({ where: { id: therapistId } })
    if (!therapist) throw new NotFoundError('Therapist not found')

    const dayOfWeek = new Date(date).getDay()
    const schedule = await prisma.therapistSchedule.findFirst({
      where: { therapistId, dayOfWeek, isAvailable: true },
    })
    if (!schedule) return { availableSlots: [] }

    const booked = await prisma.appointment.findMany({
      where: { therapistId, appointmentDate: new Date(date), status: { in: ['CONFIRMED', 'COMPLETED'] } },
    })
    const bookedTimes = booked.map((a) => a.appointmentTime)

    return { availableSlots: this.generateSlots(schedule.startTime, schedule.endTime, schedule.breakStart, schedule.breakEnd, bookedTimes) }
  }

  private generateSlots(start: string, end: string, brkStart: string | null, brkEnd: string | null, booked: string[]) {
    const slots: string[] = []
    let [h, m] = start.split(':').map(Number)
    const [eh, em] = end.split(':').map(Number)
    const endMin = eh * 60 + em

    while (h * 60 + m < endMin) {
      const t = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
      const tMin = h * 60 + m
      let inBreak = false
      if (brkStart && brkEnd) {
        const [bh, bm] = brkStart.split(':').map(Number)
        const [beh, bem] = brkEnd.split(':').map(Number)
        inBreak = tMin >= bh * 60 + bm && tMin < beh * 60 + bem
      }
      if (!inBreak && !booked.includes(t)) slots.push(t)
      m += 30
      if (m >= 60) { h++; m -= 60 }
    }
    return slots
  }

  async create(patientId: string, therapistId: string, treatmentId: string, date: string, time: string, notes?: string) {
    const treatment = await prisma.treatment.findUnique({ where: { id: treatmentId } })
    if (!treatment) throw new NotFoundError('Treatment not found')

    const clash = await prisma.appointment.findFirst({
      where: { therapistId, appointmentDate: new Date(date), appointmentTime: time, status: { in: ['CONFIRMED', 'COMPLETED'] } },
    })
    if (clash) throw new ValidationError('Slot already booked')

    return prisma.appointment.create({
      data: { patientId, therapistId, treatmentId, appointmentDate: new Date(date), appointmentTime: time, notes, status: 'CONFIRMED' },
      include: {
        patient:   { select: { firstName: true, lastName: true, email: true, phone: true } },
        therapist: { select: { user: { select: { firstName: true, lastName: true } } } },
        treatment: { select: { name: true, specialty: true } },
      },
    })
  }

  async getPatientBookings(patientId: string) {
    return prisma.appointment.findMany({
      where: { patientId },
      include: {
        therapist: { select: { user: { select: { firstName: true, lastName: true } } } },
        treatment: { select: { name: true, specialty: true } },
      },
      orderBy: { appointmentDate: 'desc' },
    })
  }

  async getById(id: string) {
    const a = await prisma.appointment.findUnique({
      where: { id },
      include: { patient: true, therapist: true, treatment: true },
    })
    if (!a) throw new NotFoundError('Appointment not found')
    return a
  }

  async cancel(id: string, reason = 'Cancelled by user') {
    return prisma.appointment.update({
      where: { id },
      data: { status: 'CANCELLED', cancelledAt: new Date(), cancelledReason: reason },
    })
  }

  async updateStatus(id: string, status: string) {
    return prisma.appointment.update({ where: { id }, data: { status } })
  }

  async getAllAdmin() {
    return prisma.appointment.findMany({
      include: {
        patient:   { select: { firstName: true, lastName: true, email: true, phone: true } },
        therapist: { select: { user: { select: { firstName: true, lastName: true } } } },
        treatment: { select: { name: true, specialty: true } },
      },
      orderBy: { appointmentDate: 'desc' },
    })
  }

  async getTherapists() {
    return prisma.therapist.findMany({
      include: { user: { select: { firstName: true, lastName: true, email: true } }, schedules: true },
    })
  }
}

export const bookingService = new BookingService()
