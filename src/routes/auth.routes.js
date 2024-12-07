import { Router } from "express";
import { greet, login, register } from "../controllers/auth.controller.js";
import { protect } from "../middlewares/protect.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello from auth routes");
});

router.post("/register", register);
router.post("/login", login);
router.get("/greet", protect, greet);
export default router;
