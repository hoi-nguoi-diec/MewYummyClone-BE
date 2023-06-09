import express from "express";

const router = express.Router();
router.get("/products", getAll);
router.get("/products/:id", get);
router.put("/products/:id", update);
export default router;