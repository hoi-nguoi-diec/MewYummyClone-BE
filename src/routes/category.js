import express from "express";
import { create, remove } from "../controllers/category";
const router = express.Router();

router.post("/categories", create)
router.delete("/categories/:id", remove)

export default router