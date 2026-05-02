import { Router } from "express";
import { list, create, updateStatus } from "../controllers/enquiries.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { CreateEnquirySchema, UpdateEnquiryStatusSchema } from "@jwell/utils";

const router = Router();

router.post("/", validate(CreateEnquirySchema), create);
router.get("/", list);
router.patch("/:id", validate(UpdateEnquiryStatusSchema), updateStatus);

export default router;
