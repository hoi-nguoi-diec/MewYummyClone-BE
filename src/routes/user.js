import express from "express";
import { get, getAll } from "../controllers/user";

const router = express.Router()

router.get("/users", getAll);
router.get("/users/:id", get)

export default router;