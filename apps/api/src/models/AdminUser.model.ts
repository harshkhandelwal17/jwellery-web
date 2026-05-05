import mongoose, { Schema, type Model } from "mongoose";

const AdminUserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    passwordHash: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "admin_users",
  }
);

export interface AdminUserDocument {
  username: string;
  passwordHash: string;
}

export const AdminUserModel: Model<AdminUserDocument> =
  (mongoose.models.AdminUser as Model<AdminUserDocument> | undefined) ||
  mongoose.model<AdminUserDocument>("AdminUser", AdminUserSchema);
