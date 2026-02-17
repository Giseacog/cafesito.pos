import express from "express";
import { addProduct, getProducts } from "../controllers/product.controller";
import { verifyToken } from "../middleware/auth.middleware";

const router = express.Router();
router.post("/add", verifyToken, addProduct);
router.get("/get", getProducts);

export default router;
