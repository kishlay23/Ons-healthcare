import jwt from "jsonwebtoken";
import { logger } from "./logger";

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

const SECRET = process.env.JWT_SECRET;
const EXPIRE = process.env.JWT_EXPIRE || "24h";
const RSECRET = process.env.REFRESH_TOKEN_SECRET;
const REXPIRE = process.env.REFRESH_TOKEN_EXPIRE || "7d";

if (!SECRET) throw new Error("JWT_SECRET environment variable is not set");
if (!RSECRET)
  throw new Error("REFRESH_TOKEN_SECRET environment variable is not set");

export const generateToken = (p: JwtPayload) =>
  jwt.sign(p, SECRET, { expiresIn: EXPIRE as jwt.SignOptions["expiresIn"] });
export const generateRefreshToken = (p: JwtPayload) =>
  jwt.sign(p, RSECRET, { expiresIn: REXPIRE as jwt.SignOptions["expiresIn"] });

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, SECRET) as JwtPayload;
  } catch (e) {
    logger.error("Token verify failed", e);
    return null;
  }
};

export const verifyRefreshToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, RSECRET) as JwtPayload;
  } catch (e) {
    logger.error("Refresh token verify failed", e);
    return null;
  }
};
