import exp from "express";
import { verifyToken } from "../middlewares/VerifyToken.js";
import { ArticleModel } from "../models/ArticleModel.js";

export const userApp = exp.Router();

/* ======================
   GET ALL ACTIVE ARTICLES
====================== */
userApp.get("/articles", verifyToken("USER"), async (req, res) => {
  try {
    const articles = await ArticleModel.find({ isArticleActive: true })
      .populate("author", "firstName lastName profileImageUrl")
      .sort({ createdAt: -1 });
    res.status(200).json({ message: "articles", payload: articles });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ======================
   GET SINGLE ARTICLE BY ID
====================== */
userApp.get("/articles/:id", verifyToken("USER"), async (req, res) => {
  try {
    const article = await ArticleModel.findOne({ _id: req.params.id, isArticleActive: true })
      .populate("author", "firstName lastName profileImageUrl")
      .populate("comments.user", "firstName lastName email profileImageUrl");

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.status(200).json({ message: "article", payload: article });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ======================
   ADD COMMENT
====================== */
userApp.put("/articles", verifyToken("USER"), async (req, res) => {
  try {
    const { articleId, comment } = req.body;
    const article = await ArticleModel.findOne({ _id: articleId, isArticleActive: true });

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    article.comments.push({ user: req.user.id, comments: comment });
    await article.save();

    const populated = await ArticleModel.findById(articleId)
      .populate("author", "firstName lastName profileImageUrl")
      .populate("comments.user", "firstName lastName email profileImageUrl");

    res.status(200).json({ message: "Comment added successfully", payload: populated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ======================
   TOGGLE LIKE
====================== */
userApp.patch("/articles/like", verifyToken("USER"), async (req, res) => {
  try {
    const { articleId } = req.body;
    const userId = req.user.id;

    const article = await ArticleModel.findOne({ _id: articleId, isArticleActive: true });
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    const alreadyLiked = article.likes.some((id) => id.toString() === userId);

    if (alreadyLiked) {
      article.likes = article.likes.filter((id) => id.toString() !== userId);
    } else {
      article.likes.push(userId);
    }

    await article.save();

    const populated = await ArticleModel.findById(articleId)
      .populate("author", "firstName lastName profileImageUrl")
      .populate("comments.user", "firstName lastName email profileImageUrl");

    res.status(200).json({
      message: alreadyLiked ? "Like removed" : "Article liked",
      payload: populated,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
