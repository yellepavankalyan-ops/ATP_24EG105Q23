import { config } from "dotenv";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/UserModel.js";

const { verify } = jwt;
config();

export const verifyToken = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      const token = req.cookies?.token;

      if (!token) {
        return res.status(401).json({ message: "Please login" });
      }

      const decodedToken = verify(token, process.env.SECRET_KEY);

      if (!allowedRoles.includes(decodedToken.role)) {
        return res.status(403).json({ message: "You are not authorised" });
      }

      // Check if user is still active (not blocked)
      if (decodedToken.role !== "ADMIN") {
        const user = await UserModel.findById(decodedToken.id);
        if (!user || !user.isUserActive) {
          res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "none" });
          return res.status(403).json({ message: "Your account has been blocked by admin" });
        }
      }

      req.user = decodedToken;
      next();
    } catch (err) {
      res.status(401).json({ message: "Invalid Token" });
    }
  };
};
