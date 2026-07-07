import bcrypt from "bcryptjs";
import crypto from "crypto";
import prisma from "../config/database";
import { generateToken, generateRefreshToken } from "../utils/jwt";
import {
  ConflictError,
  UnauthorizedError,
  NotFoundError,
  ValidationError,
} from "../utils/errors";
import { emailService } from "./email.service";

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age?: number;
  gender?: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

const safe = (u: { password?: string; [k: string]: unknown }) => {
  const { password, ...rest } = u;
  return rest;
};

export class AuthService {
  async signup(data: SignupData) {
    if (await prisma.user.findUnique({ where: { email: data.email } }))
      throw new ConflictError("Email already registered");
    if (await prisma.user.findUnique({ where: { phone: data.phone } }))
      throw new ConflictError("Phone already registered");

    const user = await prisma.user.create({
      data: {
        email: data.email,
        phone: data.phone,
        password: await bcrypt.hash(data.password, 10),
        firstName: data.firstName,
        lastName: data.lastName,
        age: data.age,
        gender: data.gender,
        role: "PATIENT",
      },
    });

    const payload = { userId: user.id, email: user.email, role: user.role };
    return {
      user: safe(user),
      token: generateToken(payload),
      refreshToken: generateRefreshToken(payload),
    };
  }

  async login(data: LoginData) {
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user || !(await bcrypt.compare(data.password, user.password)))
      throw new UnauthorizedError("Invalid email or password");

    const payload = { userId: user.id, email: user.email, role: user.role };
    return {
      user: safe(user),
      token: generateToken(payload),
      refreshToken: generateRefreshToken(payload),
    };
  }

  async getUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        age: true,
        gender: true,
        role: true,
        createdAt: true,
      },
    });
    if (!user) throw new NotFoundError("User not found");
    return user;
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await prisma.user.findUnique({ where: { email } });
    // Silently return if email not found — prevents user enumeration
    if (!user) return;

    // Delete any existing unused tokens for this user
    await prisma.passwordReset.deleteMany({ where: { userId: user.id } });

    // Generate a cryptographically random token; store only its SHA-256 hash
    const rawToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    await prisma.passwordReset.create({
      data: {
        userId: user.id,
        tokenHash,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
      },
    });

    const frontendUrl = process.env.FRONTEND_URL ?? "http://localhost:3000";
    const resetLink = `${frontendUrl}/reset-password?token=${rawToken}`;

    await emailService.sendPasswordReset(user.email, user.firstName, resetLink);
  }

  async resetPassword(rawToken: string, newPassword: string): Promise<void> {
    if (!newPassword || newPassword.length < 8)
      throw new ValidationError("Password must be at least 8 characters");

    const tokenHash = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");
    const record = await prisma.passwordReset.findUnique({
      where: { tokenHash },
    });

    if (!record || record.used)
      throw new ValidationError("Invalid or expired reset link");
    if (record.expiresAt < new Date())
      throw new ValidationError(
        "Reset link has expired. Please request a new one.",
      );

    // Update password + mark token used atomically
    await prisma.$transaction([
      prisma.user.update({
        where: { id: record.userId },
        data: { password: await bcrypt.hash(newPassword, 10) },
      }),
      prisma.passwordReset.update({
        where: { tokenHash },
        data: { used: true },
      }),
    ]);
  }
}

export const authService = new AuthService();
