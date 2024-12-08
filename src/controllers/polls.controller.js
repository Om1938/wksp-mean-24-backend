import Poll from "../models/poll.model.js";

export const getAllPolls = async (req, res) => {
  const polls = await Poll.find();
  res.status(200).json({ message: "Get all polls", data: polls });
};

export const createPoll = async (req, res) => {
  const { question, options } = req.body;

  if (!question || !options || options.length < 2) {
    return res
      .status(400)
      .json({ message: "Question and options are required" });
  }

  const optionsTOSave = options.map((option) => ({ text: option }));

  const poll = new Poll({
    question,
    options: optionsTOSave,
    createdBy: req.user.id,
  });

  await poll.save();
  res.status(201).json({ message: "Poll created", data: poll });
};

export const vote = async (req, res) => {
  const { pollId } = req.params;
  const { optionId } = req.body;
  const user = req.user.id;

  const poll = await Poll.findById(pollId);

  // If there is no poll with the given id return 404
  if (!poll) {
    return res.status(404).json({ message: "Poll not found" });
  }

  // If the poll is already voted by the user return 400
  const isVoted = poll.votes.find(
    (vote) => vote.user.toString() === user.toString()
  );

  if (isVoted) {
    return res.status(400).json({ message: "You already voted" });
  }

  //   Check if the option is valid
  const option = poll.options.find((opt) => opt._id.toString() === optionId);

  if (!option) {
    return res.status(400).json({ message: "Invalid option" });
  }

  poll.votes.push({
    user: req.user.id,
    optionId,
  });

  await poll.save();

  res.status(200).json({ message: "Voted successfully", data: poll });
};

export const getPoll = async (req, res) => {
  const { pollId } = req.params;

  const poll = await Poll.findById(pollId)
    .populate("createdBy", "username email")
    .populate("votes.user", "username email");

  if (!poll) {
    return res.status(404).json({ message: "Poll not found" });
  }

  const voteWithCounts = poll.options.map((option) => {
    const count = poll.votes.filter(
      (vote) => vote.optionId.toString() === option._id.toString()
    ).length;

    return {
      ...option.toObject(),
      voteCount: count,
    };
  });

  res.status(200).json({
    message: "Poll found",
    data: {
      ...poll.toObject(),
      options: voteWithCounts,
    },
  });
};
