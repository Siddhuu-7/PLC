import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

function jwtMiddleware(req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return next();
    }

    const decoded = jwt.verify(token, process.env.SECREATE_KEY);
    req.user = decoded;

    return next();
  } catch (error) {
    console.log("JWT error:", error.message);
    return res.status(403).json({ msg: "Invalid or expired token" });
  }
}

export default jwtMiddleware;
