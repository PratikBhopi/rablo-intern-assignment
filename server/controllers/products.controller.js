const productModel=require('../models/products.model');


module.exports.addProduct = async (req, res) => {
    const { productId, name, price, featured, rating, createdAt, company } = req.body;

    if (!productId || !name || !price || !company) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    
    try{
        const productExist=await productModel.findOne({productId:productId});
        if(productExist){
            return res.status(400).json({message:"Product already exists"});
        }

        const product= new productModel({
            productId,
            name,
            price,
            featured,
            rating,
            createdAt,
            company
        });
        product.save();

        res.status(201).json({success:true,message:"Product added successfully"});
    }catch(error){
        res.status(500).json({message:error.message});
    }
}


module.exports.getAllProducts = async (req, res) => {
    try{
        const products=await productModel.find({});
        res.status(200).json({success:true,products});
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

module.exports.updateProduct = async (req, res) => {
    const {id}=req.params;
    const {values}=req.body;
    try{
        const product=await productModel.findOneAndUpdate({productId:id},values,{new:true});
        res.status(200).json({success:true,product});
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

module.exports.deleteProduct = async (req, res) => {
    const {id}=req.params;
    try{
        const product=await productModel.findOneAndDelete({productId:id});
        res.status(200).json({success:true,product});
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

module.exports.getFeaturedProducts = async (req, res) => {
    try{
        const products=await productModel.find({featured:true});
        res.status(200).json({success:true,products});
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

module.exports.getProductsByPrice = async (req, res) => {
    const {value}=req.params;
    try{
        const products=await productModel.find({price:{ $lt: value }});
        res.status(200).json({success:true,products});
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

module.exports.getProductsByRating = async (req, res) => {
    const {value}=req.params;
    try{
        const products=await productModel.find({rating:{ $gt: value }});
        res.status(200).json({success:true,products});
    }catch(error){
        res.status(500).json({message:error.message});
    }
}