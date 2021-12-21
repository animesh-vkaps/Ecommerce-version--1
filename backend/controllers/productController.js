const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ApiFeatures = require('../utils/apiFeatures');
const shortid = require('shortid');

//Create product -- Admin
exports.createProduct = catchAsyncErrors(async(req,res,next)=>{
    
    // req.body.user = req.user.id;

    const product = await Product.create(req.body);
    res.status(201).json({
        success : true,
        product
    });
});
 
//Get All Products --- Admin
exports.getAllProducts = catchAsyncErrors(async(req,res)=>{
    
    const productPerPage = 5;
    
    const productCount = await Product.countDocuments()
    
    const apiFeature = new ApiFeatures(Product.find(),req.query).search().filter()
    
    const products = await apiFeature.query;
    
    res.status(200).json({
        success:true,
        products,
        
    });
})

//Update the product --- Admin
exports.updateProduct = catchAsyncErrors(async(req,res,next)=>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found.",404))
    }
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,useFindAndModify:false})
        
    res.status(200).json({
        success:true,
        product
    })    
})

//Delete a product
exports.deleteProduct = catchAsyncErrors(async(req,res,next)=>{
    let product = await Product.findById(req.params.id);
    // if(!product){
    //     return next(new ErrorHandler("Product not found.",404))
    // }
    await product.remove();
    res.status(200).json({
        success : true,
        message : "Product deleted successfully."
    })
})

//Get Details Or Get Details Of A Single Product
exports.getProductDetails = catchAsyncErrors(async(req,res,next) =>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product not found.",404))
    }
    res.status(200).json({
        success : true,
        product
        //productCount
    })
})

//Getting products according to the category
exports.categoryAndProduct = async(req,res)=>{
    try {
        if(req.query.category){
          const studentsdata = await Product.find({ category: req.query.category })
          return res.status(200).send(studentsdata)
        }
        const studentsdata = await Product.find({});
        res.send(studentsdata);
    } catch (e) {
      res.send(e);
    }
}


