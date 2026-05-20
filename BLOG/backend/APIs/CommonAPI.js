import exp from "express";
import { UserModel } from "../models/UserModel.js";
import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyToken } from "../middlewares/VerifyToken.js";
import { upload } from "../config/multer.js";
import { uploadToCloudinary } from "../config/cloudinaryUpload.js";
import cloudinary from "../config/cloudinary.js";

const { sign } = jwt;
export const commonApp = exp.Router();

/* =========================
   REGISTER
========================= */
commonApp.post("/users", upload.single("profileImageUrl"), async (req, res) => {
  let cloudinaryResult;
  try {
    const allowedRoles = ["USER", "AUTHOR"];
    const newUser = req.body;

    if (!allowedRoles.includes(newUser.role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const existingUser = await UserModel.findOne({ email: newUser.email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    if (req.file) {
      cloudinaryResult = await uploadToCloudinary(req.file.buffer);
      newUser.profileImageUrl = cloudinaryResult.secure_url;
    }

    newUser.password = await hash(newUser.password, 12);
    const newUserDoc = new UserModel(newUser);
    await newUserDoc.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    if (cloudinaryResult?.public_id) {
      await cloudinary.uploader.destroy(cloudinaryResult.public_id);
    }
    res.status(500).json({ message: err.message });
  }
});

/* =========================
   LOGIN
========================= */
commonApp.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    // Block check
    if (!user.isUserActive) {
      return res.status(403).json({ message: "Your account has been blocked by admin" });
    }

    const isMatched = await compare(password, user.password);
    if (!isMatched) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const signedToken = sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        profileImageUrl: user.profileImageUrl,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.cookie("token", signedToken, { httpOnly: true, sameSite: "none", secure: true });

    const userObj = user.toObject();
    delete userObj.password;

    res.status(200).json({ message: "Login successful", payload: userObj });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* =========================
   LOGOUT
========================= */
commonApp.get("/logout", async (req, res) => {
  res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "none" });
  res.status(200).json({ message: "Logout successful" });
});

/* =========================
   CHECK AUTH
========================= */
commonApp.get("/check-auth", verifyToken("USER", "AUTHOR", "ADMIN"), (req, res) => {
  res.status(200).json({ message: "Authenticated", payload: req.user });
});
