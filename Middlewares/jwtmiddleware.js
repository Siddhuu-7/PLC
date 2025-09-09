import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

function jwtMiddleware(req, res, next) {
  const token = req.cookies?.token;
  
  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.SECREATE_KEY);
    req.user = decoded;
    
     next();
  } catch (error) {
    console.error("JWT error:", error.message);
    return res.status(403).json({ msg: "Invalid or expired token" });
  }
}

export default jwtMiddleware;
