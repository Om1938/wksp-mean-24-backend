import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("Welcome to the auth routes");
});

router.get("/login", (req, res) => {
  res.send("Login pages");
});

export default router;
