import express from "express";
import { addProduct } from "../controllers/product.controller";
import { verifyToken } from "../middleware/auth.middleware";


const router = express.Router();
router.post("/add",verifyToken, addProduct);

export default router;