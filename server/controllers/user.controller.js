const { validationResult } = require('express-validator')
const userModel = require('../models/user.model');
const dotenv=require('dotenv')
dotenv.config();

module.exports.registerUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ succes:false,errors: errors.array() });
        }

        const { name, email, password } = req.body;

        const findUser = await userModel.findOne({ email: email })
        if (findUser) {
            return res.status(200).json({succes:false, message: "User exist." })
        }

        const hashedPassword = await userModel.hashPassword(password);
        const user = await userModel.create({ name: name, email: email, password: hashedPassword });
        user.save();
        const token = user.generateAuthToken();
        res.cookie('token',token)
        return res.status(201).json({succes:true, token: token, uesr: user });
    } catch (error) {
        return res.status(400).json({succes:false, message: "error occured" })
    }
}


module.exports.loginUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({succes:false, errors: errors.array() });
        }
        const { password, email } = req.body;
        const user = await userModel.findOne({ email: email }).select('+password');
        if (!user) {
            return res.status(404).json({succes:false, message: "Invalid email or password" });
        }

        const checkPassword = await user.comparePassword(password);
        if (!checkPassword) {
            return res.status(401).json({ message: "incorrect password" })
        }

        const token = user.generateAuthToken();
        // res.cookie('token',token);
        return res.status(200).json({ success: true, token: token });

    } catch (error) {
        return res.status(400).json({succes:false, error: error })
    }
}