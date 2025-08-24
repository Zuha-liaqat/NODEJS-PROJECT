const userModels = require("../models/userModels")
const bcrypt= require("bcryptjs")
const nodemailer = require("nodemailer");
const JWT = require("jsonwebtoken")

const usercontroller = async (req,res) =>{
try {
    const user = await userModels.findById(req.user.id)
    console.log(user)
     if(!user){
        return res.status(404).send({
            success:false,
            message:"user not found"
        })
     }
     res.status(200).send({
        success:true,
        message:"user get successfully",
        user
     })
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Failed",
        error
    })
}
}

const updatecontroller = async (req,res) =>{
try {
    const user = await userModels.findById(req.user.id)
    console.log(user)
     if(!user){
        return res.status(404).send({
            success:false,
            message:"user not found"
        })
     }
     const {name} = req.body
     if(name) user.name= name
     
     await user.save()
     res.status(200).send({
        success:true,
        message:"user updated successfully",
        user
     })
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Failed",
        error
    })
}
}

const updatepasswordcontroller = async (req,res) =>{
try {
    const user = await userModels.findById(req.user.id)
   
     if(!user){
        return res.status(404).send({
            success:false,
            message:"user not found"
        })
     }

     const {oldPassword,newPassword} = req.body
     if(!oldPassword || !newPassword){
        return res.status(500).send({
           success:false,
           message:"Please provide all fields"
        })
     }
     const isMatch = await bcrypt.compare(oldPassword, user.password);
        if(!isMatch){
            return res.status(500).send({
                success:false,
                message:"Invalid Credentials"
            })
        }
     user.password= newPassword
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword= await bcrypt.hash(newPassword,salt)
      user.password = hashedPassword;
     await user.save()
     res.status(200).send({
        success:true,
        message:"password updated successfully",
        user
     })
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Failed",
        error
    })
}
}




module.exports = {usercontroller,updatecontroller,updatepasswordcontroller}