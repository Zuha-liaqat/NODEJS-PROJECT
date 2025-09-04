const foodModels = require("../models/foodModels");

const orderModels = require("../models/orderModels");

const foodController = async (req, res) => {
  try {
    const { title, imageurl, price, rating, description } = req.body;

    if (!title || !price ) {
      return res.status(400).send({
        success: false,
        message: "Please provide all required fields (title, price)"
      });
    }

    // Create new food
    const food = new foodModels({
      title,
      imageurl,
      price,
      rating,
      description,
     
    });

    await food.save();

   

    res.status(201).send({
      success: true,
      message: "Food created successfully",
      food
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in creating food",
      error: error.message
    });
  }
};


const getfoodController = async (req, res) => {
  try {
    // query params se page aur limit nikal lo
    const page = parseInt(req.query.page) || 1;   
    const limit = parseInt(req.query.limit) || 5; 
    const skip = (page - 1) * limit;

    // total documents count
    const totalCount = await foodModels.countDocuments();

    // sirf required records fetch karo
    const food = await foodModels.find({})
      .skip(skip)
      .limit(limit);

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
    const { cart, payment, id } = req.body;

    if (!cart || !payment) {
      return res.status(400).send({
        success: false,
        message: "Food cart or payment missing",
      });
    }

    // Total price calculate with quantity
    let total = 0;
    cart.forEach((item) => {
      total += item.price;
    });

    // Save order
    const newOrder = new orderModels({
      foods: cart,
      payment: total,
      buyer: id, // frontend se bheja hua userId
    });

    await newOrder.save();

    res.status(201).send({
      success: true,
      message: "Order placed successfully",
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