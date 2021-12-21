const express = require('express');
const { registerUser, loginUser, logoutUser } = require('../controllers/userController');
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/auth');
//Signup 
router.post("/signup",async(req,res,next)=>{
    try{
        const { name, email, phone, password, role} = req.body;
        if(!name || !email || !phone || !password){
            return res.status(422).json({error : "Please fill every field."})
        }
        const userExist = await User.findOne({email});
        if(userExist){
            return res.status(422).json({error:"Please try another email"});
        }
        else{
            const user = new User ({name,email,password,phone});
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password,salt);
            const newUser = await user.save();
            return res.status(201).json({"msg" : "User registered successfully"});

        }
    }
    catch(err){
        console.log(err)
    }
})
//Login User
router.post("/login",async(req,res)=>{
    try{
        const{email,password}=req.body;
        if(!email || !password){
            return res.status(422).json({error:"please fill all the fields"})
        }
        
        const userLogin = await User.findOne({email})
        if(userLogin){
        // return res.redirect('/admin')
        const isMatch=await bcrypt.compare(password,userLogin.password)

        let token =await userLogin.generateAuthToken()
        // console.log(token)

        // res.cookie("jwtoken",token,{
        //     expires:new Date(Date.now()+258920000),
        //     httpOnly:true
        // })

        if(!isMatch){
            return res.status(422).json({err:"INVALID CREDENTIALS"})
        }else{
            return res.status(201).json({msg:"USER LOGIN SUCCESSFULL", token , userLogin})
        }
        }else{
            // return res.redirect('/client')
            return res.status(422).json({error:"invalid credentials"})
        }  
    }catch(err){
        console.log(err) 
    }
});
router.get('/logout',(req,res)=>{
    console.log('hello my logout page');
    res.clearCookie('jwtoken',{path:'/'})
    res.status(200).send('User logout');
});

router.get("/userdetails/:id", async(req,res,next)=>{
    const user = await User.findById(req.params.id);
   
    res.status(200).json({
        success : true,
        user
    })
});

router.patch("/users/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) throw new Error("user not found");
  
      const updates = Object.keys(req.body);
  
      updates.forEach((update) => (user[update] = req.body[update]));
      await user.save();
      res.json({ success: true, message: "profile updated", user });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  });


  //Getting user profile
  router.get("/user/:id", async(req,res,next)=>{
      
  })
  
module.exports = router;