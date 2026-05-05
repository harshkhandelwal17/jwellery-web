import type { Request, Response, NextFunction } from "express";
import { verifyAdminLogin } from "../services/adminAuth.service.js";

export async function loginAdmin(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const username = String(req.body?.username ?? "");
    const password = String(req.body?.password ?? "");
    if (!username || !password) {
      res.status(400).json({ success: false, error: "Username and password are required" });
      return;
    }

    const ok = await verifyAdminLogin(username, password);
    if (!ok) {
      res.status(401).json({ success: false, error: "Invalid admin credentials" });
      return;
    }

    res.json({ success: true, data: { username } });
  } catch (err) {
    next(err);
  }
}
