const ContactModel = require("../models/ContactModel")

const contactController = async (req,res)=>{
    try {
       const  {name,email,message} = req.body
       if(!name || !email ||!message){
        return res.status(500).send({
            success:false,
            message:"Provide all fields"
        })
       }
       const contactform = new ContactModel({
         name,
         email,
         message
       })
       res.status(201).send({
        success:true,
        message:"Created Successfully",
        contactform
       })
    } catch (error) {
        return res.status(500).send({
            success:false,
            message:"Error in api"
        })
    }
}

module.exports={contactController}