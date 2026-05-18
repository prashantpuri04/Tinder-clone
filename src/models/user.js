const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        
    },
    lastName:{
        type:String,
        
    },
    emailId:{
        type:String,
    },
    password:{
        type:String,
    },
    age:{
        type:Number,
    }, 
    gender:{
        type:String,
        validate(value){
            if(!["male","female","other"].includes(value.toLowerCase())){
                throw new Error("Invalid gender. Please choose 'male', 'female', or 'other'.");
            }
        }
    },
},{
    timestamps:true
});

userSchema.methods.getJWT   = async function(){
    const user = this;
    const token  = jwt.sign({_id:user._id, name: user.firstName }, "DEV@Tinder$780", { expiresIn: "1d" });
    return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUser){
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
    return isPasswordValid;
}





const User = mongoose.model("User",userSchema);

module.exports = User;