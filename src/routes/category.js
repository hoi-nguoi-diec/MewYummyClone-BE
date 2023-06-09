import express from "express";
import { create, get, getAll, remove, update } from "../controllers/category";
import { checkPermission } from "../middlewares/checkPermission";
const router = express.Router();

router.get("/categories", getAll);
router.get("/categories/:id", get);
router.put("/categories/:id",checkPermission, update);
router.post("/categories",checkPermission, create)
router.delete("/categories/:id",checkPermission, remove)

export default router
