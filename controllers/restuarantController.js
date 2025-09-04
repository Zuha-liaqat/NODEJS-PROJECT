const restuarantModel = require("../models/restuarantModel")

const restuarantController = async (req, res) => {
  try {
    const { title, imageurl, time, rating,description } = req.body;

    if (!title || !rating) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields",
      });
    }

    // Database me new restaurant create karo
    const newRestuarant = new restuarantModel({
      title,
      imageurl,
      time,
      rating,
      description
    });

    await newRestuarant.save();

    // Ek hi response
    return res.status(201).send({
      success: true,
      message: "Restaurant created successfully",
      restaurant: newRestuarant,
    });

  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in Restaurant API",
      error: error.message,
     
    });
  }
};
const getallrestuarantController = async (req, res) => {
  try {
    const restaurants = await restuarantModel.find({})
      .populate({
        path: "categories",
        populate: { path: "foods" } // 👈 foods inside categories
      });

    if (!restaurants) {
      return res.status(404).send({
        success: false,
        message: "No restaurant available"
      });
    }

    res.status(200).send({
      success: true,
      message: "Restaurants available",
      totalCount: restaurants.length,
      restaurants
    });

  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in Restaurant API",
      error: error.message,
    });
  }
};


const getrestuarantbyIdController = async (req,res) => {
  try {
    const restuarantid = req.params.id;
    const restuarant = await restuarantModel.findById(restuarantid)
      .populate("categories"); // Only categories

    if(!restuarant){
      return res.status(404).send({
        success:false,
        message:"Restaurant not found"
      });
    }

    res.status(200).send({
      success:true,
      restuarant
    });

  } catch(error) {
    return res.status(500).send({
      success: false,
      message: "Error in Restaurant API",
      error: error.message,
    });
  }
};
const deleterestuarantbyIdController = async (req,res)=>{
   try{
     const restuarantid =req.params.id;
   
     if(!restuarantid){
      return res.status(404).send({
         success:false,
         message:"not found"
      })
     }
     await restuarantModel.findByIdAndDelete(restuarantid)
     res.status(200).send({
      success:true,
      message:"Restuarant deleted successfully"
     })
   }
   catch(error){
      return res.status(500).send({
      success: false,
      message: "Error in Restaurant API",
      error: error.message,
     
    });
   }
}

module.exports = { restuarantController, getallrestuarantController,getrestuarantbyIdController,deleterestuarantbyIdController};
