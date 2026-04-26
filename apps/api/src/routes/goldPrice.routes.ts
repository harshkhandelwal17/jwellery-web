import { Router } from "express";
import { getGoldPrice, updateGoldPrice } from "../controllers/goldPrice.controller.js";
import { requireAdminKey } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { UpdateGoldPriceSchema } from "@jwell/utils";

const router = Router();

router.get("/", getGoldPrice);
router.put("/", requireAdminKey, validate(UpdateGoldPriceSchema), updateGoldPrice);

export default router;
