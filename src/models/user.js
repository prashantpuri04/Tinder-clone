const mongoose = require('mongoose');

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

const User = mongoose.model("User",userSchema);

module.exports = User;