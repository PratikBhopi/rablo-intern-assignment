const jwt=require('jsonwebtoken');
const userModel=require('../models/user.model');
require('dotenv').config();

module.exports.authUser=async(req,res,next)=>{
    const token=req.cookies?.token || req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({message:'unauthorized'})
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
        const user=await userModel.findById(decoded.id);
        req.user=user
        return next();
    } catch (error) {
        return res.status(401).json({message:'unauthorized'})
    }
}