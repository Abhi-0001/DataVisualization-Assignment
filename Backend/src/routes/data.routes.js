import { Router } from "express";
import { getCollectionData } from "../controllers/data.controller.js";

const router = Router();

router.get("/:collection", getCollectionData);

export { router as dataRouter };
