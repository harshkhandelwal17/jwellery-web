import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { AdminUserModel } from "../models/AdminUser.model.js";

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password: string, storedHash: string): boolean {
  const [salt, hashHex] = storedHash.split(":");
  if (!salt || !hashHex) return false;
  const digest = scryptSync(password, salt, 64);
  const stored = Buffer.from(hashHex, "hex");
  if (stored.length !== digest.length) return false;
  return timingSafeEqual(stored, digest);
}

export async function verifyAdminLogin(username: string, password: string): Promise<boolean> {
  const user = await AdminUserModel.findOne({ username: username.trim() }).lean();
  if (!user) return false;
  return verifyPassword(password, user.passwordHash);
}
