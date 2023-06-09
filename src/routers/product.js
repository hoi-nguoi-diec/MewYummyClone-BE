import express from "express";
import { create, remove } from "../controllers/product";

import { checkPermission } from "../middlewares/checkPermission";


const router = express.Router();


router.post("/products",checkPermission, create);
router.delete("/products/:id",checkPermission, remove);

export default router;
