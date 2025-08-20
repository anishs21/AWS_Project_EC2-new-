import express from "express";
import {login,  registerUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/client/login", login);
router.post("/admin/login", login);
router.post("/user/register", registerUser);

export default router;
