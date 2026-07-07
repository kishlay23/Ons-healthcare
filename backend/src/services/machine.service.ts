import prisma from "../config/database";
import { NotFoundError } from "../utils/errors";

export class MachineService {
  async getAll(specialty?: string) {
    return prisma.machine.findMany({
      where: specialty ? { specialty } : undefined,
      orderBy: { name: "asc" },
    });
  }

  async getById(id: string) {
    const row = await prisma.machine.findUnique({
      where: { id },
      include: { treatments: { include: { treatment: true } } },
    });
    if (!row) throw new NotFoundError("Machine not found");
    return row;
  }

  async create(data: {
    name: string;
    brand: string;
    model: string;
    description: string;
    imageUrl?: string;
    specialty: string;
    certifications: string[];
    acquiredDate: string;
  }) {
    return prisma.machine.create({
      data: { ...data, acquiredDate: new Date(data.acquiredDate) },
    });
  }

  async update(id: string, data: Record<string, unknown>) {
    if (data.acquiredDate)
      data.acquiredDate = new Date(data.acquiredDate as string);
    return prisma.machine.update({ where: { id }, data });
  }

  async delete(id: string) {
    await prisma.machine.delete({ where: { id } });
    return { message: "Machine deleted" };
  }
}

export const machineService = new MachineService();
