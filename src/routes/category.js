import express from "express";
import { create, remove } from "../controllers/category";
import { checkPermission } from "../middlewares/checkPermission";
const router = express.Router();

router.post("/categories",checkPermission, create)
router.delete("/categories/:id",checkPermission, remove)

export default router