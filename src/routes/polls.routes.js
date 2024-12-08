import { Router } from "express";
import {
  createPoll,
  getAllPolls,
  vote,
} from "../controllers/polls.controller.js";
import { protect } from "../middlewares/protect.js";

const pollsRouter = Router();

pollsRouter.get("/", getAllPolls);
pollsRouter.post("/", protect, createPoll);
pollsRouter.post("/:pollId/vote", protect, vote);

export default pollsRouter;
