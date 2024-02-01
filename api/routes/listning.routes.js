import express from "express";
import { verifyToken } from "../utils/verfyUser.js";
import { createListning , deleteListning } from "../controllers/listning.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createListning);
router.delete("/delete/:id", verifyToken, deleteListning);

export default router;
