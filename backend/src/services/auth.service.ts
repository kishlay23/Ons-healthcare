import bcrypt from 'bcryptjs'
import prisma from '../config/database'
import { generateToken, generateRefreshToken } from '../utils/jwt'
import { ConflictError, UnauthorizedError, NotFoundError } from '../utils/errors'

export interface SignupData {
  firstName: string; lastName: string; email: string
  phone: string; age?: number; gender?: string; password: string
}

export interface LoginData { email: string; password: string }

const safe = (u: { password?: string; [k: string]: unknown }) => {
  const { password, ...rest } = u
  return rest
}

export class AuthService {
  async signup(data: SignupData) {
    if (await prisma.user.findUnique({ where: { email: data.email } }))
      throw new ConflictError('Email already registered')
    if (await prisma.user.findUnique({ where: { phone: data.phone } }))
      throw new ConflictError('Phone already registered')

    const user = await prisma.user.create({
      data: {
        email: data.email, phone: data.phone,
        password: await bcrypt.hash(data.password, 10),
        firstName: data.firstName, lastName: data.lastName,
        age: data.age, gender: data.gender, role: 'PATIENT',
      },
    })

    const payload = { userId: user.id, email: user.email, role: user.role }
    return { user: safe(user), token: generateToken(payload), refreshToken: generateRefreshToken(payload) }
  }

  async login(data: LoginData) {
    const user = await prisma.user.findUnique({ where: { email: data.email } })
    if (!user || !(await bcrypt.compare(data.password, user.password)))
      throw new UnauthorizedError('Invalid email or password')

    const payload = { userId: user.id, email: user.email, role: user.role }
    return { user: safe(user), token: generateToken(payload), refreshToken: generateRefreshToken(payload) }
  }

  async getUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true, firstName: true, lastName: true,
                phone: true, age: true, gender: true, role: true, createdAt: true },
    })
    if (!user) throw new NotFoundError('User not found')
    return user
  }
}

export const authService = new AuthService()
