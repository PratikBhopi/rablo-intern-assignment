const express=require('express');
const authMiddleware=require('../middlewares/auth.middleware');
const { addProduct, getAllProducts, updateProduct, deleteProduct, getFeaturedProducts, getProductsByPrice, getProductsByRating } = require('../controllers/products.controller');
const router=express.Router();


router.post('/add-product',authMiddleware.authUser,addProduct);

router.get('/all',authMiddleware.authUser,getAllProducts);

router.post('/update-product/:id',authMiddleware.authUser,updateProduct);

router.delete('/delete-product/:id',authMiddleware.authUser,deleteProduct);

router.get('/featured',authMiddleware.authUser,getFeaturedProducts);

router.get('/price/:value',authMiddleware.authUser,getProductsByPrice);

router.get('/rating/:value',authMiddleware.authUser,getProductsByRating);

module.exports=router;


