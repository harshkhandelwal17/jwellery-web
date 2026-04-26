import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinary } from "./cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "jwell/products",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  } as Record<string, unknown>,
});

export const uploadImage = multer({ storage }).single("image");
