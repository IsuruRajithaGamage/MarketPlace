import express from "express";
import { verifyToken } from "../utils/verfyUser.js";
import { createListning } from "../controllers/listning.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createListning);

export default router;
