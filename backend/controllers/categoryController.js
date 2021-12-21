const Category = require('../models/categoryModel');
const errorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');


// //Create category
// exports.createCategory = catchAsyncErrors(async(req,res,next)=>{
//     const category = await Category.create(req.body);
//     res.status(201).json({
//         success : true,
//         category
//     });
// });
//Creating category
exports.createCategory = catchAsyncErrors(async(req,res,next)=>{
    
    // req.body.user = req.user.id;

    const category = await Category.create(req.body);
    res.status(201).json({
        success : true,
        category
    });
});

//Getting all categories
//Get All Products --- Admin
exports.getAllCategory = async(req,res)=>{
   // const categoryCount = await Category.countDocuments()
    const category = await Category.find();
    res.status(200).json({
        success:true,
        category
       
    });
}
//Updating a category
 
exports.updateCategory = catchAsyncErrors(async(req,res,next)=>{
    let category = await Category.findById(req.params.id);
    if(!category){
        return next(new ErrorHandler("Category not found.",404))
    }
    category = await Category.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,useFindAndModify:false})
        
    res.status(201).json({
        success:true,
        category
    })    
});

//Deleting a category
exports.deleteCategory = catchAsyncErrors(async(req,res,next)=>{
    let category = await Category.findById(req.params.id);
    if(!category){
        return res.json("Category not found")
    }
    await category.remove();
    res.status(200).json({
        success : true,
        message : "Category deleted successfully."
    })
})