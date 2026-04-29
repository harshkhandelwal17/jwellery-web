import { Router } from "express";
import { list, create, updateStatus } from "../controllers/enquiries.controller.js";
import { requireAdminKey } from "../middleware/auth.middleware.js";

const router = Router();

// Public route for creating enquiries
router.post("/", create);

// Admin routes
router.get("/", requireAdminKey, list);
router.patch("/:id", requireAdminKey, updateStatus);

export default router;
