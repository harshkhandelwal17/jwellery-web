import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { AdminUserModel } from "../models/AdminUser.model.js";

function hashPassword(password: string): string {
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

function getDefaultAdminUsername(): string {
  return (process.env.ADMIN_LOGIN_USERNAME ?? "admin").trim();
}

function getDefaultAdminPassword(): string {
  return (process.env.ADMIN_LOGIN_PASSWORD ?? "").trim();
}

export async function ensureDefaultAdminUser(): Promise<void> {
  const username = getDefaultAdminUsername();
  const password = getDefaultAdminPassword();
  if (!username || !password) return;

  const existing = await AdminUserModel.findOne({ username }).lean();
  if (existing) return;

  await AdminUserModel.create({
    username,
    passwordHash: hashPassword(password),
  });
}

export async function verifyAdminLogin(username: string, password: string): Promise<boolean> {
  const user = await AdminUserModel.findOne({ username: username.trim() }).lean();
  if (!user) return false;
  return verifyPassword(password, user.passwordHash);
}
