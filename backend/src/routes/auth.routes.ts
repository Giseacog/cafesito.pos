import express from "express";
import { login, register } from "../controllers/auth.controllers";

const router = express.Router();
router.post("/register", register);
router.post("/login", login);
// router.post("/product", product);

export default router;
