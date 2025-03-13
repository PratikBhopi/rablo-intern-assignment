const express=require ('express');
const { registerUser, loginUser } = require('../controllers/user.controller');
const router=express.Router();
const {body}=require('express-validator');

router.post('/register',[
    body('email').isEmail().withMessage("Invalid Email"),
    body('name').isLength({min:2}).withMessage('Name must have 2 characters'),
    body('password').isLength({min:6}).withMessage('Password must be of 6 Characters')
],registerUser);

router.post('/login',[ body('email').isEmail().withMessage("Invalid Email")],loginUser);

module.exports=router;