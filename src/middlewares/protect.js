import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  console.log(req.headers.authorization);

  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json("Unauthorized");
  }

  let decodedData = jwt.verify(token, process.env.JWT_SECRET);
  const { email, id } = decodedData;

  req.user = { email, id };
  next();
};
