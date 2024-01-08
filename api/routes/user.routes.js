import express from "express";
import { test, updateUser } from "../controllers/user.contoller.js";
import { verifyToken } from "../utils/verfyUser.js";

const router = express.Router();

router.get("/test", test);
router.post("/update/:id", verifyToken, updateUser);

export default router;
