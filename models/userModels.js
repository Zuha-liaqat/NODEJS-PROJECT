const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  
    name:{
        type:String,
        required:[true,"name is required"]
    },
    
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true
    },

    password:{
        type:String,
        required:[true,"password is required"]
    },
    role: {
    type: String,
    enum: ["user", "admin"], 
    default: "user" 
  }


}, {timestamps: true})
module.exports = mongoose.model('User',userSchema)