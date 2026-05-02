import mongoose from "mongoose";

/** Reuses connection across warm serverless invocations (e.g. Vercel). */
export async function connectDB(): Promise<void> {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set");

  if (mongoose.connection.readyState >= 1) return;

  await mongoose.connect(uri);
  console.log("MongoDB connected");
}
