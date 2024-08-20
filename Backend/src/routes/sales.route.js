import { Router } from "express";
import { getGrowthRate, getSales } from "../controllers/sales.controller.js";

const router = Router();

router.get("/:interval", getSales);
router.get("/growth/:interval", getGrowthRate);

export { router as salesRouter };
