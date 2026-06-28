import prisma from '../config/database'
import { NotFoundError } from '../utils/errors'

const hydrate = (m: { certifications: string; [k: string]: unknown }) => ({
  ...m,
  certifications: JSON.parse(m.certifications || '[]'),
})

export class MachineService {
  async getAll(specialty?: string) {
    const rows = await prisma.machine.findMany({
      where: specialty ? { specialty } : undefined,
      orderBy: { name: 'asc' },
    })
    return rows.map(hydrate)
  }

  async getById(id: string) {
    const row = await prisma.machine.findUnique({
      where: { id },
      include: { treatments: { include: { treatment: true } } },
    })
    if (!row) throw new NotFoundError('Machine not found')
    return hydrate(row)
  }

  async create(data: {
    name: string; brand: string; model: string; description: string
    imageUrl?: string; specialty: string; certifications: string[]; acquiredDate: string
  }) {
    const row = await prisma.machine.create({
      data: { ...data, certifications: JSON.stringify(data.certifications), acquiredDate: new Date(data.acquiredDate) },
    })
    return hydrate(row)
  }

  async update(id: string, data: Record<string, unknown>) {
    if (Array.isArray(data.certifications)) data.certifications = JSON.stringify(data.certifications)
    if (data.acquiredDate) data.acquiredDate = new Date(data.acquiredDate as string)
    const row = await prisma.machine.update({ where: { id }, data })
    return hydrate(row)
  }

  async delete(id: string) {
    await prisma.machine.delete({ where: { id } })
    return { message: 'Machine deleted' }
  }
}

export const machineService = new MachineService()
