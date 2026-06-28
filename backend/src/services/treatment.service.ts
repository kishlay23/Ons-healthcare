import prisma from '../config/database'
import { NotFoundError } from '../utils/errors'

// SQLite stores arrays as JSON strings — parse them back on the way out
const hydrate = (t: { benefits: string; conditions: string; [k: string]: unknown }) => ({
  ...t,
  benefits:   JSON.parse(t.benefits   || '[]'),
  conditions: JSON.parse(t.conditions || '[]'),
})

export class TreatmentService {
  async getAll(specialty?: string) {
    const rows = await prisma.treatment.findMany({
      where: specialty ? { specialty } : undefined,
      include: { machines: { include: { machine: true } }, pricing: true },
      orderBy: { name: 'asc' },
    })
    return rows.map(hydrate)
  }

  async getById(id: string) {
    const row = await prisma.treatment.findUnique({
      where: { id },
      include: { machines: { include: { machine: true } }, pricing: true },
    })
    if (!row) throw new NotFoundError('Treatment not found')
    return hydrate(row)
  }

  async create(data: {
    name: string; description: string; specialty: string
    durationMinutes: number; standardSessions: number
    benefits: string[]; conditions: string[]; pricePerSession: number
  }) {
    const row = await prisma.treatment.create({
      data: {
        ...data,
        benefits:   JSON.stringify(data.benefits),
        conditions: JSON.stringify(data.conditions),
      },
    })
    return hydrate(row)
  }

  async update(id: string, data: Partial<ReturnType<TreatmentService['create']>>) {
    const patch: Record<string, unknown> = { ...data }
    if (Array.isArray(data.benefits))   patch.benefits   = JSON.stringify(data.benefits)
    if (Array.isArray(data.conditions)) patch.conditions = JSON.stringify(data.conditions)
    const row = await prisma.treatment.update({ where: { id }, data: patch })
    return hydrate(row)
  }

  async delete(id: string) {
    await prisma.treatment.delete({ where: { id } })
    return { message: 'Treatment deleted' }
  }
}

export const treatmentService = new TreatmentService()
