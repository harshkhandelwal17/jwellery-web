import { Router } from "express";
import { list, get, create, update, remove } from "../controllers/products.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { uploadImage } from "../upload/upload.middleware.js";
import { CreateProductSchema, UpdateProductSchema } from "@jwell/utils";

const router = Router();

router.get("/", list);
router.post(
  "/upload",
  uploadImage,
  (req, res) => {
    res.json({ success: true, url: (req.file as Express.Multer.File & { path: string }).path });
  }
);
router.get("/:id", get);
router.post("/", validate(CreateProductSchema), create);
router.put("/:id", validate(UpdateProductSchema), update);
router.delete("/:id", remove);

export default router;
