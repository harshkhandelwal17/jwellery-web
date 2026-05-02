import { Types } from "mongoose";
import { EnquiryModel } from "../models/Enquiry.model.js";
import type { Enquiry } from "@jwell/types";

function toIso(d: unknown): string {
  if (d instanceof Date) return d.toISOString();
  if (typeof d === "string") return d;
  return new Date(0).toISOString();
}

/** API + admin expect `id` (string) and ISO dates — not raw `_id` / Date objects. */
export function toEnquiryDto(doc: Record<string, unknown> | null | undefined): Enquiry | null {
  if (!doc || doc["_id"] == null) return null;
  const id = String(doc["_id"]);
  const productIdRaw = doc["productId"];
  return {
    id,
    name: String(doc["name"] ?? ""),
    phone: String(doc["phone"] ?? ""),
    email: doc["email"] != null ? String(doc["email"]) : undefined,
    message: doc["message"] != null ? String(doc["message"]) : undefined,
    productId: productIdRaw != null ? String(productIdRaw) : undefined,
    productName: doc["productName"] != null ? String(doc["productName"]) : undefined,
    status: doc["status"] as Enquiry["status"],
    createdAt: toIso(doc["createdAt"]),
    updatedAt: toIso(doc["updatedAt"]),
  };
}

export async function getEnquiries(): Promise<Enquiry[]> {
  const rows = await EnquiryModel.find().sort({ createdAt: -1 }).lean();
  return rows
    .map((r) => toEnquiryDto(r as unknown as Record<string, unknown>))
    .filter((e): e is Enquiry => e != null);
}

export async function createEnquiry(data: {
  name: string;
  phone: string;
  email?: string | null;
  message?: string | null;
  productId?: string | null;
  productName?: string | null;
}): Promise<Enquiry> {
  const doc: Record<string, unknown> = {
    name: data.name,
    phone: data.phone,
    email: data.email ?? null,
    message: data.message ?? null,
    productName: data.productName ?? null,
  };
  if (data.productId && Types.ObjectId.isValid(data.productId)) {
    doc["productId"] = new Types.ObjectId(data.productId);
  }
  const created = await EnquiryModel.create(doc);
  const dto = toEnquiryDto(created.toObject() as unknown as Record<string, unknown>);
  if (!dto) throw new Error("Failed to create enquiry");
  return dto;
}

export async function updateEnquiryStatus(id: string, status: string): Promise<Enquiry | null> {
  if (!["new", "contacted", "closed"].includes(status)) {
    throw new Error("Invalid status");
  }
  const row = await EnquiryModel.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true }
  ).lean();
  return toEnquiryDto(row as unknown as Record<string, unknown> | null);
}
