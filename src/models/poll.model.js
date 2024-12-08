import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  text: { type: String, required: true },
});

const pollSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [optionSchema],
  votes: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      optionId: { type: mongoose.Schema.Types.ObjectId },
    },
  ],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

const Poll = mongoose.model("Poll", pollSchema);

export default Poll;
