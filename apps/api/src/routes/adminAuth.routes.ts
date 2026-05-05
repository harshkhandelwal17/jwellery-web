import { Router } from "express";
import { loginAdmin } from "../controllers/adminAuth.controller.js";

const router = Router();

router.post("/login", loginAdmin);

export default router;
