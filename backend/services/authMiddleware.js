import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // "Bearer TOKEN"
  console.log("token is",req.headers.authorization);
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "mySecretKey");
    req.user = decoded; // store user info for later use
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
