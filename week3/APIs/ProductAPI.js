import exp from 'express'
import {ProductModel } from '../models/ProductModel.js'
export const productApp = exp.Router()

//Define PRODUCT REST API Routes

//Create a new Product
productApp.post("/products", async (req, res) => {
    //get new product obj from req
    const newProduct = req.body;
    //create new product document
    const newproductDocument = new ProductModel(newProduct)
    //save
    const result = await newproductDocument.save()
    console.log(result)
    //send res
    res.status(201).json({ message: "Product Created" }) //201 status code shows successfull creation of user
}
)

//Read all users
productApp.get("/products", async (req, res) => {
    //read all users from db
    let productList = await ProductModel.find()
    //send res
    res.status(201).json({ message: "products", payload: productList })
})

//Read a product by product id
productApp.get("/products/:id", async (req, res) => {
    //Read product id from req params
    const pid = req.params.id
    //find product
    const productObj=await ProductModel.findOne({productId:pid})
    if(!productObj)
        return res.status(404).json({ message: "Product not found"})
    //send res
    res.status(201).json({ message: "Product", payload: productObj })
})

//Update a product by id
productApp.put("/products/:id", async (req, res) => {
    //get modified product from req
    const modifiedProduct = req.body
    const pid = req.params.id
    //find product by id and update
    const updatedProduct = await ProductModel.findOneAndUpdate(
        {productId:pid},
        { $set: { ...modifiedProduct } },
        { new: true,runValidators:true })
    if(!updatedProduct)
        return res.status(404).json({message:"Product not found"})
    //send res
    res.status(201).json({ message: "Product Modified", payload: updatedProduct })
})

//Delete a product by Object id
productApp.delete("/products/:id",async(req,res)=> {
    const pid = req.params.id
    //find and delete a product by id
    let deletedProduct=await ProductModel.findOneAndDelete({productId:pid})
    if(!deletedProduct)
        return res.status(404).json({message:"Product not found to delete"})
    //send res
    res.status(200).json({message:"Deleted Product",payload:deletedProduct})
})