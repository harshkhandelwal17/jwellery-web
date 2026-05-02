import { Router } from "express";
import { getGoldPrice, updateGoldPrice } from "../controllers/goldPrice.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { UpdateGoldPriceSchema } from "@jwell/utils";

const router = Router();

router.get("/", getGoldPrice);
router.put("/", validate(UpdateGoldPriceSchema), updateGoldPrice);

export default router;
