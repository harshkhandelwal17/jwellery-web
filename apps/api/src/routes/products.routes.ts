import { Router } from "express";
import { list, get, create, update, remove } from "../controllers/products.controller.js";
import { requireAdminKey } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { uploadImage } from "../upload/upload.middleware.js";
import { CreateProductSchema, UpdateProductSchema } from "@jwell/utils";

const router = Router();

router.get("/",    list);
router.get("/:id", get);
router.post("/",   requireAdminKey, validate(CreateProductSchema), create);
router.put("/:id", requireAdminKey, validate(UpdateProductSchema), update);
router.delete("/:id", requireAdminKey, remove);

// Image upload
router.post("/upload", requireAdminKey, uploadImage, (req, res) => {
  res.json({ success: true, url: (req.file as Express.Multer.File & { path: string }).path });
});

export default router;
