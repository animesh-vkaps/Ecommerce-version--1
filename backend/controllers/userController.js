const errorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');
//Registering a user
exports.registerUser = catchAsyncErrors(async(req,res,next)=>{
    const { name, email, password, phone} = req.body;
    const user = await User.create({
        name, email, password,phone,
        
    });
    sendToken(user,201,res)
}); 
//Login a user or Signing in a user
exports.loginUser = catchAsyncErrors(async(req,res,next)=>{
    const { email, password} = req.body;

    //Checking if user has given password and email
    if(!email || !password){
        return next(new errorHandler("Please enter email and password.",404));
    }
    const user = await User.findOne({ email }).select("+password");
    if(!user){
        return next(new errorHandler("Invalid email or password.",401));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new errorHandler("Invalid email or password",401))
    }
    sendToken(user, 200, res);
})
//Logout User
exports.logoutUser = catchAsyncErrors(async(req,res,next)=>{

    res.cookie("token",null,{
        expires : new Date(Date.now()),
        httpOnly : true
    })

    res.status(200).json({
        success : true,
        message : "User is logged out successfully."
    })
})