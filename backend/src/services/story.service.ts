import prisma from '../config/database'
import { NotFoundError, ValidationError } from '../utils/errors'

export interface SubmitStoryData {
  title?: string; storyText: string; condition: string
  specialty: string; photoUrl?: string; videoUrl?: string; rating: number
}

export class StoryService {
  async getPublished(specialty?: string) {
    return prisma.patientStory.findMany({
      where: { status: 'PUBLISHED', ...(specialty ? { specialty } : {}) },
      include: { patient: { select: { firstName: true, lastName: true } } },
      orderBy: { publishedAt: 'desc' },
    })
  }

  async getFeatured() {
    return prisma.patientStory.findMany({
      where: { status: 'PUBLISHED', featured: true },
      include: { patient: { select: { firstName: true, lastName: true } } },
      take: 6,
    })
  }

  async getById(id: string) {
    const story = await prisma.patientStory.findUnique({
      where: { id },
      include: { patient: { select: { firstName: true, lastName: true, age: true } } },
    })
    if (!story || story.status !== 'PUBLISHED') throw new NotFoundError('Story not found')
    return story
  }

  async submit(patientId: string, data: SubmitStoryData) {
    if (data.rating < 1 || data.rating > 5) throw new ValidationError('Rating must be 1–5')
    return prisma.patientStory.create({ data: { patientId, ...data, status: 'PENDING' } })
  }

  // Admin methods
  async getAll() {
    return prisma.patientStory.findMany({
      include: { patient: { select: { firstName: true, lastName: true, email: true } } },
      orderBy: { createdAt: 'desc' },
    })
  }

  async approve(id: string, featured = false) {
    return prisma.patientStory.update({
      where: { id },
      data: { status: 'PUBLISHED', featured, publishedAt: new Date() },
    })
  }

  async reject(id: string) {
    return prisma.patientStory.update({ where: { id }, data: { status: 'REJECTED' } })
  }

  async updateStatus(id: string, status: string) {
    return prisma.patientStory.update({ where: { id }, data: { status } })
  }
}

export const storyService = new StoryService()
