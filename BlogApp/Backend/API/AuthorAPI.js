import exp from 'express'
import { UserModel } from '../Models/UserModel.js'
import { ArticleModel } from '../Models/ArticleModel.js'
import { verifyToken } from '../middlewares/verifyToken.js'

export const authorApp= exp.Router()

//Write Article (protected route)
authorApp.post("/article", verifyToken("AUTHOR"), async(req,res)=>{
    //get articleObj from client
    const articleObj=req.body

    let user=req.user

    //check author
    let author= await UserModel.findById(articleObj.author)
    //check if the author exist
    if(!author)
    {
        return res.status(404).json({message:"Invalid Author"})
    }
    //cross check 
    if(author.email!=user.email)
        return res.status(403).json({Message:"You are not authorized due to different author"})
    //create article Document
    const articleDoc= await ArticleModel(articleObj)
    //save
    await articleDoc.save()
    //send res
    res.status(201).json({Message:"Article added"})
})


//Display articles published 
authorApp.get("/article", verifyToken("AUTHOR"), async(req,res)=>{

    //read article by author email
    const authoridofToken=req.user?.id;
    //get articles 
    const articlesList=await ArticleModel.find({author:authoridofToken})
    //send res
    res.status(200).json({Message:"Articles Published",payload:articlesList})
})


//Edit Article
authorApp.put("/article",verifyToken("AUTHOR"),async (req,res)=>{
    //get author id form decoded token
    const authoridofToken=req.user?.id;
    //get modified article from client
    const { articleId,title,category,content }=req.body
    const ModifiedArticle=await ArticleModel.findByIdAndUpdate(
        {_id:articleId,author: authoridofToken },
        {$set:{title,category,content}},
        {new:true})
    //if either article id or author not correct
    if(!ModifiedArticle)
        return res.status(403).json({message:"Not authorized to edit articles"})
    //send res
    res.status(200).json({message:"Article modified",payload:ModifiedArticle})
})


//Delete article(soft delete)
authorApp.patch("/article", verifyToken("AUTHOR"), async (req, res) => {
  //get author id from decoded token
  const authorIdOfToken = req.user?.id;
  //get modified article from client
  const { articleId, isArticleActive } = req.body;
  //get article by id
  const articleOfDB = await ArticleModel.findOne({ _id: articleId, author: authorIdOfToken });
  //check status
  if (isArticleActive === articleOfDB.isArticleActive) {
    return res.status(200).json({ message: "Article already in the same state" });
  }

  articleOfDB.isArticleActive = isArticleActive;
  await articleOfDB.save();
  //SEND RES
  res.status(200).json({ message: "Artcile modified", payload: articleOfDB });
});