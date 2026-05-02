import type { Request, Response, NextFunction } from "express";

/** Ready for when admin routes are gated again (JWT / session). */
export function requireAdminKey(req: Request, res: Response, next: NextFunction): void {
  const key = req.headers["x-admin-key"];
  if (!key || key !== process.env.ADMIN_API_KEY) {
    res.status(401).json({ success: false, error: "Unauthorized" });
    return;
  }
  next();
}
