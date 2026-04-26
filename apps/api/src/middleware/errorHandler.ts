import type { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: Error & { status?: number },
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error(err);
  const status = err.status ?? 500;
  res.status(status).json({ success: false, error: err.message ?? "Internal server error" });
}
