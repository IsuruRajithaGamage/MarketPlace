import express from "express";
import { verifyToken } from "../utils/verfyUser.js";
import {
  createListning,
  deleteListning,
  editListing,
  getListing,
} from "../controllers/listning.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createListning);
router.delete("/delete/:id", verifyToken, deleteListning);
router.post("/update/:id", verifyToken, editListing);
router.get("/get/:id", getListing);

export default router;
