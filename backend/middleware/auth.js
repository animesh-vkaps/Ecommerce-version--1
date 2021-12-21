
const User=require("../models/userModel");
const jwt= require ("jsonwebtoken");

const Authenticate = async (req,res,next) => {
    
        try {
          const token = req.header("Authorization").replace("Bearer ", "");
          console.log("token",token);
          console.log(process.env.SECRET_KEY)
          const decoded = jwt.verify(token, process.env.SECRET_KEY);
          console.log("decoded", decoded);
          const user = await User.findById(decoded._id);
          if (!user) {
            throw new Error();
          }
          req.user = user;
          req.token = token;
          next();
        } catch (e) {
          res.status(401).json({ success: false, error: "Please authenticate!" });
        }
      };
      
      module.exports = Authenticate;
    // try{
    //     const token = req.cookies.jwtoken;
    //     const verifyToken = jwt.verify(token,process.env.SECRET_KEY);

    //     const rootUser=await User.findOne({_id: verifyToken._id,"tokens.token":token});
    //     if(!rootUser) { throw new Error('User not Found')}
    //     req.token=token;
    //     req.rootUser=rootUser;
    //     req.userID=rootUser._id;

    //     next();

    // }catch(err){
    //     res.status(401).send('Unauthorized:No token provided');
    //     console.log(err);
    // }


