import { EnquiryModel } from "../models/Enquiry.model.js";

export async function getEnquiries() {
  return EnquiryModel.find().sort({ createdAt: -1 }).lean();
}

export async function createEnquiry(data: {
  name: string;
  phone: string;
  email?: string;
  message?: string;
  productId?: string;
  productName?: string;
}) {
  return EnquiryModel.create(data);
}

export async function updateEnquiryStatus(id: string, status: string) {
  if (!["new", "contacted", "closed"].includes(status)) {
    throw new Error("Invalid status");
  }
  return EnquiryModel.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true }
  ).lean();
}
