import exp from 'express'
import {ArticleModel} from '../Models/ArticleModel.js'
import {verifyToken} from '../middlewares/verifyToken.js'
export const userApp= exp.Router()

//Read all the articles
userApp.get("/articles", verifyToken("USER"), async (req, res) => {
  try {
    // read ALL articles (not just one)
    const articleList = await ArticleModel.find({ isArticleActive: true });

    res.status(200).json({
      message: "Articles fetched successfully",
      payload: articleList,
    });
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch articles",
    });
  }
})


//Add comments to an article
userApp.put("/articles", verifyToken("USER"), async (req, res) => {
  try {
    const { articleId, comment } = req.body;

    const articleDocument = await ArticleModel.findOne({
      _id: articleId,
      isArticleActive: true,
    });

    if (!articleDocument) {
      return res.status(404).json({ message: "Article not found" });
    }

    const userId = req.user?.id;

    // ✅ FIXED FIELD NAME
    articleDocument.comments.push({
      user: userId,
      comment: comment,
    });

    await articleDocument.save();

    res.status(200).json({
      message: "Comment added successfully", // ✅ lowercase
      payload: articleDocument,
    });
  } catch (err) {
    res.status(500).json({
      error: "Failed to add comment",
    });
  }
});
