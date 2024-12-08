import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  // Destructure the request body
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json("All input is required");
  }

  try {
    // Check if user is already existing with us.
    const existinguser = await User.findOne({
      email,
    });
    // If user is already existing, then return error
    if (existinguser) {
      return res.status(400).json("User Already Exists");
    }

    // If user is not existing, then create a new user
    const user = new User({
      username,
      email,
      password,
    });

    // Save the user to the database
    user.save();
    res.status(201).json({
      user,
      message: "User registered successfully",
    });
  } catch (err) {
    // If there is an error, then return the error message
    return res.status(400).json(err.message);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("All input is required");
  }

  const user = await User.findOne({
    email,
  });

  if (!user) {
    return res.status(401).json("User not found");
  }

  if (!user.isValidPassword(password)) {
    return res.status(401).json("Invalid password");
  }

  const token = jwt.sign(
    {
      email: user.email,
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  //   Send the JWT token to the user
  res.status(200).json({
    result: user,
    token,
    message: "User logged in successfully",
  });
};

export const greet = async (req, res) => {
  const user = req.user;

  res.status(200).json({
    message: `Hello ${user.email}`,
  });
};
