import express from "express";
import { test, updateUser, deleteUser , getUserListings } from "../controllers/user.contoller.js";
import { verifyToken } from "../utils/verfyUser.js";

const router = express.Router();

router.get("/test", test);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get('/listings/:id', verifyToken,getUserListings)

export default router;
