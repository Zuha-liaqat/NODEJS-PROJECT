const foodModels = require("../models/foodModels");
const sendEmail = require("../utils/sendEmail");
const orderModels = require("../models/orderModels");

const foodController = async (req, res) => {
  try {
    const { title, price, rating, description} = req.body;
    

    const newFood = new foodModels({
      title,
      price,
      rating,
      description,
      imageurl: req.file ? req.file.path : null, 
    });

    await newFood.save();

    res.status(201).send({
      success: true,
      message: "Food created successfully",
      food: newFood,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in creating food",
      error: error.message,
    });
  }
};


const getfoodController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

  
    const search = req.query.search ? {
      title: { $regex: req.query.search, $options: "i" }
    } : {};

  
    const totalCount = await foodModels.countDocuments(search);

   
    const food = await foodModels.find(search)
      .skip(skip)
      .limit(limit);
   console.log("Search Result:", food);
    if (!food || food.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No Data found"
      });
    }

    res.status(200).send({
      success: true,
      message: "Data Found",
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      food
    });

  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in food api",
      error: error.message
    });
  }
};




const getbyIDfoodController = async (req,res)=>{
try {
    const foodid  = req.params.id
    const food = await foodModels.findById(foodid)
    if(!food){
        res.status(404).send({
            success:false,
            message:"Not found"
        })
    } 
    res.status(200).send({
        success:true,
        message:"Found",
        food
    })
} catch (error) {
    res.status(500).send({
        success:false,
        message:"Error in api",
        error
    })
}
}

const deletebyIDfoodController = async (req,res)=>{
    try {
        const foodid = req.params.id
       
        if(!foodid){
            return res.status(400).send({
                success:false,
                message:"No data found"
            })
        }
         await foodModels.findByIdAndDelete(foodid)
        res.status(200).send({
            success:true,
            message:"Deleted successfully"
        })
    } catch (error) {
        res.status(500).send({
        success:false,
        message:"Error in api"
    })
    }
}

const updatebyIDController = async (req,res)=>{
 try {
    const {id} = req.params
    const {title,imageurl,price,rating,description} = req.body
    const food = await foodModels.findByIdAndUpdate(id,{title,imageurl,price,rating,description},{new:true})
    if(!food){
       return res.status(404).send({
        success:true,
        message:"Not Found"
       })

    }
    res.status(200).send({
        success:true,
        message:"Updated Successfully"
    })
    
 } catch (error) {
    res.status(500).send({
        success:false,
        message:"Error in api"
    })
 }
}



const placeorderController = async (req, res) => {
  try {
    console.log("🟢 Inside placeorderController");
    const { cart, id, email } = req.body;

    if (!cart || cart.length === 0 || !email) {
      return res.status(400).send({
        success: false,
        message: "Food cart or email missing",
      });
    }

    // Total price calculate by fetching from DB
    let total = 0;
    for (let foodId of cart) {
      const food = await foodModels.findById(foodId);
      if (food) {
        total += food.price; // ✅ DB se price uthao
      }
    }

    // Save order
    const newOrder = new orderModels({
      foods: cart,   // sirf IDs store hongi
      payment: total,
      buyer: id,
    });

    await newOrder.save();

    // Send email
    await sendEmail(
      email,
      "Order Confirmation",
      `Thank you for your order!\n\nOrder ID: ${newOrder._id}\nTotal: $${total}\n\nWe will deliver soon.`
    );

    console.log("✅ Order placed and email sent");
    res.status(201).send({
      success: true,
      message: "Order placed successfully & email sent",
      order: newOrder,
    });
  } catch (error) {
    console.error("Place Order Error:", error);
    res.status(500).send({
      success: false,
      message: "Error in place order API",
    });
  }
};




module.exports = {foodController,getfoodController,getbyIDfoodController,placeorderController,deletebyIDfoodController,updatebyIDController}