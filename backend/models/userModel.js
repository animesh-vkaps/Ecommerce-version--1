const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');


//Schema for user's registration.
const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true,
        default : "user"
    },
    tokens : [
        {
            token :{
                type : String,
                required : true
            }
        }
    ]

})

// //Encrypting the user's password using bcrypt.
// userSchema.pre("save",async function(next){

//     if(!this.isModified("password")){
//         next();
//     }

//     this.password = await bcrypt.hash(this.password, 10)
// })

//Implementing Json Web Token
userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id : this._id},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    }
    catch(err){
        console.log(err);
    }
};

// //Compare password
// userSchema.methods.comparePassword = async function(enteredPassword){
//     return await bcrypt.compare(enteredPassword,this.password)
// }


module.exports = mongoose.model("User",userSchema);