// const express = require('express');
// const router = express.Router();
// const User = require('../models/userModel');
// const jwt=require('jsonwebtoken');
// const bcrypt=require('bcryptjs');

// router.post("/adminlogin",async(req,res)=>{
//     try{
//         const{ email,password } = req.body;
//         if(!email || !password){
//             return res.status(422).json({
//                 success:false,
//                 error:"These fields cannot be empty."
//             })
//         }
//         const userLogin = await User.findOne({email});
//         console.log(userLogin)
//         if(userLogin){
//             const isMatch = await bcrypt.compare(password,userLogin.password);
//             let token = await userLogin.generateAuthToken();
//             console.log(token);
        
//             if(!isMatch){
//                 return res.status(422).json({err : "Invalid Password"})
//             }
//             else{
//                 return res.status(201).json({
//                     success : true,
//                     message : "Admin Logged in Successfully."
//                 })
//             }
//         }
        
//         else{
//             // return res.redirect('/client')
//             return res.status(422).json({error:"invalid credentials"})
//         }  
//     }
//     catch(err){
//         console.log(err);
//     }

// })
// module.exports = router;