const userModel = require("../models/userModels")
const bcrypt= require("bcryptjs")
const JWT = require("jsonwebtoken")

const authcontroller =async (req,res) =>{
try {
    const {name,email,password} = req.body
    if(!name || !password || ! email){
        return res.status(400).send({
            success:false,
            message: "Please provide all fields"
        })
    }

    const existing = await userModel.findOne({email})
    if(existing){
        return res.status(409).send({
            success:false,
            message:"Email already exists"
        })
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword= await bcrypt.hash(password,salt)
    let role = "user";

    
    if (email === "admin@example.com") {
      role = "admin";
    }
   
    const user = await userModel.create({
        name,
        email,
        password:hashedPassword,
        role
    })
    res.status(201).send({
        success:true,
        message:"Successfully Registered",
        user,
    })
} catch (error) {
    console.log(error)
    res.status(500).send({
    success: false,
    message: "Something went wrong",
    error: error.message
    })
}
}

const logincontroller =async (req,res) =>{
try {
    const {email,password} = req.body
    if(!password || !email){
        return res.status(400).send({
            success:false,
            message: "Please provide all fields"
        })
    }

    const user = await userModel.findOne({email})
    if(!user){
        return res.status(404).send({
            success:false,
            message:"user not found"
        })
    }

   const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(500).send({
            success:false,
            message:"Invalid Credentials"
        })
    }
    const token = JWT.sign(
  { id: user._id, role: user.role },  
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);
    res.status(200).send({
        success:true,
        message:"Login Successfully",
        token,
        user,
    })
} catch (error) {
    console.log(error)
    res.status(500).send({
    success: false,
    message: "Something went wrong",
    error: error.message
    })
}
}

module.exports = {authcontroller,logincontroller}