const userModels = require("../models/userModels")
const bcrypt= require("bcryptjs")
const nodemailer = require("nodemailer");
const JWT = require("jsonwebtoken")

const usercontroller = async (req,res) =>{
try {
    const {id} = req.params
    const user = await userModels.findById(id)
    
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
    const {id} = req.params
    const user = await userModels.findById(id)
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

const getalluserscontroller = async(req,res)=>{
    try {
        const users = await userModels.find()
        if(!users){
            return res.status(404).send({
                success:false,
                message:"No data found"
            })
        
        }
        res.status(200).send({
            success:true,
            message:"Data found successfully",
            users
        })
    } catch (error) {
        return res.status(500).send({
            success:false,
            message:"Error in api"
        })
    }
}

const deleteuserbyIDcontroller = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await userModels.findByIdAndDelete(id);

    if (!data) {
      return res.status(404).send({
        success: false,
        message: "No data found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "User deleted successfully",
      data,
    });

  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in api",
      error: error.message,
    });
  }
};



const addToWishlistcontroller = async (req, res) => {
  try {
    const userId = req.user.id; 
    const productId = req.params.id; 

    const user = await userModels.findById(userId);
    if (!user) return res.status(404).send({ success: false, message: "User not found" });

    if (user.wishlist.includes(productId)) {
      return res.status(400).send({ success: false, message: "Already in wishlist" });
    }

    user.wishlist.push(productId);
    await user.save();

   
    await user.populate("wishlist");

    res.status(200).send({
      success: true,
      message: "Added to wishlist",
      wishlist: user.wishlist,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};


const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.id;

    const user = await userModels.findById(userId);
    if (!user) return res.status(404).send({ success: false, message: "User not found" });

    user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
    await user.save();

    
    await user.populate("wishlist");

    res.status(200).send({
      success: true,
      message: "Removed from wishlist",
      wishlist: user.wishlist,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};


const getWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userModels.findById(userId).populate("wishlist");
    if (!user) return res.status(404).send({ success: false, message: "User not found" });

    res.status(200).send({
      success: true,
      items: user.wishlist, 
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports = { addToWishlistcontroller, removeFromWishlist, getWishlist };










module.exports = {getWishlist,addToWishlistcontroller,removeFromWishlist,usercontroller,updatecontroller,updatepasswordcontroller,getalluserscontroller,deleteuserbyIDcontroller}