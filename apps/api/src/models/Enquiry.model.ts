import { Schema, model, Types } from "mongoose";

interface IEnquiry {
  _id: Types.ObjectId;
  name: string;
  phone: string;
  email?: string;
  message?: string;
  productId?: Types.ObjectId;
  productName?: string;
  status: "new" | "contacted" | "closed";
  createdAt: Date;
  updatedAt: Date;
}

const EnquirySchema = new Schema<IEnquiry>(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true, default: null },
    message: { type: String, trim: true, default: null },
    productId: { type: Schema.Types.ObjectId, ref: "Product", default: null },
    productName: { type: String, trim: true, default: null },
    status: { type: String, enum: ["new", "contacted", "closed"], default: "new" },
  },
  { timestamps: true }
);

export const EnquiryModel = model<IEnquiry>("Enquiry", EnquirySchema);
