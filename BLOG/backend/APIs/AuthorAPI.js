import exp from "express";
import { ArticleModel } from "../models/ArticleModel.js";
import { verifyToken } from "../middlewares/VerifyToken.js";

export const authorApp = exp.Router();

/* ======================
   GET AUTHOR'S ARTICLES
====================== */
authorApp.get("/article", verifyToken("AUTHOR"), async (req, res) => {
  try {
    const articles = await ArticleModel.find({ author: req.user.id }).populate("author", "firstName lastName profileImageUrl");
    res.status(200).json({ message: "articles", payload: articles });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ======================
   CREATE ARTICLE
====================== */
authorApp.post("/article", verifyToken("AUTHOR"), async (req, res) => {
  try {
    const { title, category, content } = req.body;
    const newArticle = new ArticleModel({
      author: req.user.id,
      title,
      category,
      content,
    });
    await newArticle.save();
    res.status(201).json({ message: "Article created successfully", payload: newArticle });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ======================
   UPDATE ARTICLE (own only)
====================== */
authorApp.put("/article", verifyToken("AUTHOR"), async (req, res) => {
  try {
    const { articleId, title, category, content } = req.body;

    if (!articleId) {
      return res.status(400).json({ message: "Article ID is required" });
    }

    const article = await ArticleModel.findOne({ _id: articleId, author: req.user.id });
    if (!article) {
      return res.status(404).json({ message: "Article not found or not yours" });
    }

    const updatedArticle = await ArticleModel.findByIdAndUpdate(
      articleId,
      { $set: { title, category, content } },
      { new: true, runValidators: true }
    ).populate("author", "firstName lastName profileImageUrl");

    res.status(200).json({ message: "Article updated successfully", payload: updatedArticle });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ======================
   TOGGLE ARTICLE ACTIVE (soft delete/restore)
====================== */
authorApp.patch("/article", verifyToken("AUTHOR"), async (req, res) => {
  try {
    const { articleId, isArticleActive } = req.body;

    const article = await ArticleModel.findOne({ _id: articleId, author: req.user.id });
    if (!article) {
      return res.status(404).json({ message: "Article not found or not yours" });
    }

    article.isArticleActive = isArticleActive;
    await article.save();

    res.status(200).json({ message: "Article status updated", payload: article });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
