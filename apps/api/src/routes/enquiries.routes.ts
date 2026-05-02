import { Router } from "express";
import { list, create, updateStatus } from "../controllers/enquiries.controller.js";
const router = Router();

// Public route for creating enquiries
router.post("/", create);

router.get("/", list);
router.patch("/:id", updateStatus);

export default router;
