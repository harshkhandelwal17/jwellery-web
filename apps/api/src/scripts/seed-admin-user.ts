import "dotenv/config";
import mongoose from "mongoose";
import { AdminUserModel } from "../models/AdminUser.model.js";
import { hashPassword } from "../services/adminAuth.service.js";

function getEnv(name: string): string {
  return String(process.env[name] ?? "").trim();
}

async function run() {
  const uri = getEnv("MONGODB_URI");
  if (!uri) throw new Error("MONGODB_URI is not set in .env");

  const username = getEnv("ADMIN_LOGIN_USERNAME") || "admin";
  const password = getEnv("ADMIN_LOGIN_PASSWORD") || "admin@123";

  await mongoose.connect(uri);
  console.log("Connected to MongoDB");

  const passwordHash = hashPassword(password);
  const doc = await AdminUserModel.findOneAndUpdate(
    { username },
    { username, passwordHash },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  console.log(`Admin user seeded: ${doc.username}`);
  console.log("Default password set from ADMIN_LOGIN_PASSWORD (or fallback admin@123).");

  await mongoose.disconnect();
  console.log("Done");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
