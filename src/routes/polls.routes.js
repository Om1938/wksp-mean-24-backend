import { Router } from "express";
import {
  createPoll,
  getAllPolls,
  getPoll,
  vote,
} from "../controllers/polls.controller.js";
import { protect } from "../middlewares/protect.js";

const pollsRouter = Router();

pollsRouter.get("/", getAllPolls);
pollsRouter.post("/", protect, createPoll);
pollsRouter.post("/:pollId/vote", protect, vote);
// http://localhost:5050/polls/1234
pollsRouter.get("/:pollId", getPoll);
export default pollsRouter;
