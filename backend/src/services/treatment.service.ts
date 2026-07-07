import prisma from "../config/database";
import { NotFoundError } from "../utils/errors";

export class TreatmentService {
  async getAll(specialty?: string) {
    return prisma.treatment.findMany({
      where: specialty ? { specialty } : undefined,
      include: { machines: { include: { machine: true } }, pricing: true },
      orderBy: { name: "asc" },
    });
  }

  async getById(id: string) {
    const row = await prisma.treatment.findUnique({
      where: { id },
      include: { machines: { include: { machine: true } }, pricing: true },
    });
    if (!row) throw new NotFoundError("Treatment not found");
    return row;
  }

  async create(data: {
    name: string;
    description: string;
    specialty: string;
    durationMinutes: number;
    standardSessions: number;
    benefits: string[];
    conditions: string[];
    pricePerSession: number;
  }) {
    return prisma.treatment.create({ data });
  }

  async update(
    id: string,
    data: {
      name?: string;
      description?: string;
      specialty?: string;
      durationMinutes?: number;
      standardSessions?: number;
      benefits?: string[];
      conditions?: string[];
      pricePerSession?: number;
    },
  ) {
    return prisma.treatment.update({ where: { id }, data });
  }

  async delete(id: string) {
    await prisma.treatment.delete({ where: { id } });
    return { message: "Treatment deleted" };
  }
}

export const treatmentService = new TreatmentService();
