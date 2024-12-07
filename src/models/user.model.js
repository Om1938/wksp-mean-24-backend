import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre("save", function (next) {
  const hashedPassword = bcrypt.hashSync(this.password, 12);
  this.password = hashedPassword;
  next();
});

userSchema.methods.isValidPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

//Make a model(user model) based on the schema (userSchema)
const User = mongoose.model("User", userSchema);

export default User;
