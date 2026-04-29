import type { Request, Response, NextFunction } from "express";
import * as enquiriesService from "../services/enquiries.service.js";

export async function list(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const enquiries = await enquiriesService.getEnquiries();
    res.json({ success: true, data: enquiries });
  } catch (err) { next(err); }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const enquiry = await enquiriesService.createEnquiry(req.body);
    res.status(201).json({ success: true, data: enquiry });
  } catch (err) { next(err); }
}

export async function updateStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { status } = req.body as { status: string };
    const enquiry = await enquiriesService.updateEnquiryStatus(req.params["id"] as string, status);
    if (!enquiry) { res.status(404).json({ success: false, error: "Enquiry not found" }); return; }
    res.json({ success: true, data: enquiry });
  } catch (err) { next(err); }
}
