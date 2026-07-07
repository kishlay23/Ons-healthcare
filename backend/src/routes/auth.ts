import { Router, Request, Response, NextFunction } from "express";
import rateLimit from "express-rate-limit";
import { authService } from "../services/auth.service";
import { auth, AuthRequest } from "../middleware/auth";
import { ValidationError, UnauthorizedError } from "../utils/errors";
import { verifyRefreshToken, generateToken } from "../utils/jwt";

const router = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: {
    message: "Too many login attempts. Please try again in 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const signupLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: {
    message:
      "Too many accounts created from this IP. Please try again in an hour.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const forgotPasswordLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  message: { message: "Too many reset requests. Please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post(
  "/signup",
  signupLimiter,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        firstName,
        lastName,
        email,
        phone,
        age,
        gender,
        password,
        confirmPassword,
      } = req.body;
      if (!firstName || !lastName || !email || !phone || !password)
        throw new ValidationError("Missing required fields");
      if (password !== confirmPassword)
        throw new ValidationError("Passwords do not match");
      if (password.length < 8)
        throw new ValidationError("Password must be at least 8 characters");

      const result = await authService.signup({
        firstName,
        lastName,
        email,
        phone,
        age: age ? +age : undefined,
        gender,
        password,
      });
      res
        .status(201)
        .json({ message: "Account created successfully", ...result });
    } catch (e) {
      next(e);
    }
  },
);

router.post(
  "/login",
  loginLimiter,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        throw new ValidationError("Email and password required");
      const result = await authService.login({ email, password });
      res.json({ message: "Login successful", ...result });
    } catch (e) {
      next(e);
    }
  },
);

router.post("/logout", (_req, res) =>
  res.json({ message: "Logged out successfully" }),
);

router.post(
  "/refresh",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) throw new ValidationError("Refresh token required");
      const payload = verifyRefreshToken(refreshToken);
      if (!payload)
        throw new UnauthorizedError("Invalid or expired refresh token");
      const user = await authService.getUserById(payload.userId);
      const token = generateToken({
        userId: user.id,
        email: user.email,
        role: user.role,
      });
      res.json({ token });
    } catch (e) {
      next(e);
    }
  },
);

router.get(
  "/me",
  auth,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const user = await authService.getUserById(req.user!.userId);
      res.json({ user });
    } catch (e) {
      next(e);
    }
  },
);

// profile alias
router.get(
  "/profile",
  auth,
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const user = await authService.getUserById(req.user!.userId);
      res.json({ user });
    } catch (e) {
      next(e);
    }
  },
);

router.post(
  "/forgot-password",
  forgotPasswordLimiter,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;
      if (!email) throw new ValidationError("Email is required");
      await authService.forgotPassword(email);
      // Always return the same response regardless of whether email exists
      res.json({
        message:
          "If an account exists for that email, a password reset link has been sent.",
      });
    } catch (e) {
      next(e);
    }
  },
);

router.post(
  "/reset-password",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token, newPassword } = req.body;
      if (!token || !newPassword)
        throw new ValidationError("Token and new password are required");
      await authService.resetPassword(token, newPassword);
      res.json({ message: "Password reset successfully. You can now log in." });
    } catch (e) {
      next(e);
    }
  },
);

export default router;
