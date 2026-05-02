import { Router } from "express";
import { list, get, create, update, remove } from "../controllers/products.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { uploadImage } from "../upload/upload.middleware.js";
import { CreateProductSchema, UpdateProductSchema } from "@jwell/utils";

const router = Router();

router.get("/", list);
router.post("/upload", (req, res) => {
  uploadImage(req, res, (err) => {
    if (err) {
      console.error("products/upload:", err);
      res.status(400).json({
        success: false,
        error:
          err instanceof Error ? err.message : "Image upload failed (check API Cloudinary env vars)",
      });
      return;
    }
    const file = req.file as (Express.Multer.File & { path?: string }) | undefined;
    const url = file?.path;
    if (!url) {
      res.status(400).json({
        success: false,
        error: 'No image received — form field must be named "image"',
      });
      return;
    }
    res.json({ success: true, url });
  });
});
router.get("/:id", get);
router.post("/", validate(CreateProductSchema), create);
router.put("/:id", validate(UpdateProductSchema), update);
router.delete("/:id", remove);

export default router;
