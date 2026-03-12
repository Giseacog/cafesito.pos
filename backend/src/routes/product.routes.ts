import express from "express";
import {
  addProduct,
  addProductToCart,
  getProducts,
} from "../controllers/product.controller";
import { verifyToken } from "../middleware/auth.middleware";

const router = express.Router();
router.post("/add", verifyToken, addProduct);
router.get("/get", getProducts);
router.post("/add-to-cart", verifyToken, addProductToCart);

export default router;
