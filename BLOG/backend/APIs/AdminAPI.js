import exp from "express";
import { UserModel } from "../models/UserModel.js";
import { ArticleModel } from "../models/ArticleModel.js";
import { verifyToken } from "../middlewares/VerifyToken.js";

export const adminApp = exp.Router();

/* ======================
   GET ALL USERS (authors + users)
====================== */
adminApp.get("/users", verifyToken("ADMIN"), async (req, res) => {
  try {
    const users = await UserModel.find({ role: { $in: ["USER", "AUTHOR"] } }).select("-password");
    res.status(200).json({ message: "users", payload: users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ======================
   BLOCK / UNBLOCK USER
====================== */
adminApp.patch("/user/:id/block", verifyToken("ADMIN"), async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.isUserActive = !user.isUserActive;
    await user.save();

    res.status(200).json({
      message: user.isUserActive ? "User unblocked" : "User blocked",
      payload: user,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ======================
   GET ALL ARTICLES (including inactive)
====================== */
adminApp.get("/articles", verifyToken("ADMIN"), async (req, res) => {
  try {
    const articles = await ArticleModel.find()
      .populate("author", "firstName lastName email profileImageUrl")
      .sort({ createdAt: -1 });
    res.status(200).json({ message: "articles", payload: articles });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ======================
   BLOCK / UNBLOCK ARTICLE
====================== */
adminApp.patch("/article/:id/block", verifyToken("ADMIN"), async (req, res) => {
  try {
    const article = await ArticleModel.findById(req.params.id);
    if (!article) return res.status(404).json({ message: "Article not found" });

    article.isArticleActive = !article.isArticleActive;
    await article.save();

    res.status(200).json({
      message: article.isArticleActive ? "Article unblocked" : "Article blocked",
      payload: article,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ======================
   DELETE USER PERMANENTLY
====================== */
adminApp.delete("/user/:id", verifyToken("ADMIN"), async (req, res) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted permanently" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
