import type {
  Enquiry,
  CreateEnquiryInput,
  UpdateEnquiryStatusInput,
} from "@jwell/types";
import { apiFetch } from "./client";

export async function getEnquiries(
  baseUrl: string,
  adminKey: string
): Promise<Enquiry[]> {
  return apiFetch<Enquiry[]>(`${baseUrl}/enquiries`, {
    headers: { "x-admin-key": adminKey },
  });
}

export async function createEnquiry(
  baseUrl: string,
  data: CreateEnquiryInput
): Promise<Enquiry> {
  return apiFetch<Enquiry>(`${baseUrl}/enquiries`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateEnquiryStatus(
  baseUrl: string,
  id: string,
  data: UpdateEnquiryStatusInput,
  adminKey: string
): Promise<Enquiry> {
  return apiFetch<Enquiry>(`${baseUrl}/enquiries/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: { "x-admin-key": adminKey },
  });
}
