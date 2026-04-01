import express from "express";
import { addNewUser, loginUser } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", addNewUser);
router.post("/login", loginUser);

router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Protected route",
    userId: req.user,
  });
});
router.get("/verify", protect, (req, res) => {
  try {
    res.status(200).json({ message: "Valid token" });
  } catch (err) {
    console.error(err);
  }
});
export default router;
