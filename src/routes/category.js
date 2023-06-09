import express from "express";
import { create, } from "../controllers/category";
const router = express.Router();

router.post("/categories",checkPermission, create)

export default router