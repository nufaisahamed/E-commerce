const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
    },
    avatar:{
        type:String,
        default:"http://localhost:4000/uploads/profile.jpg"
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"user"
    }

})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password = await bcrypt.hash(this.password,10);
    
});
const userModel = mongoose.model("user",userSchema);
module.exports = userModel;