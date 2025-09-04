const categoryModels = require("../models/categoryModels");
const restuarantModel = require("../models/restuarantModel");

const categoryController = async (req, res) => {
  try {
    const { title, imageurl, restuarant } = req.body;

    if (!title || !imageurl || !restuarant) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields",
      });
    }

    // Step 1: Create category
    const newCategory = new categoryModels({
      title,
      imageurl,
    });

    await newCategory.save();

    // Step 2: Push category into restaurant
    await restuarantModel.findByIdAndUpdate(
      restuarant,
      { $push: { categories: newCategory._id } },
      { new: true }
    );

    return res.status(201).send({
      success: true,
      message: "Category created and added to restaurant successfully",
      category: newCategory,
    });

  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in Category API",
      error: error.message,
    });
  }
};

const updateController = async(req,res)=>{
    try {
      const {id} = req.params
      const {title,imageurl} = req.body
      const updatedCategory = await categoryModels.findByIdAndUpdate(id,{title,imageurl},{new:true})
      if(!updatedCategory){
        return res.status(500).send({
          success:false,
          message:"No Category Found"
        })
      }
      res.status(200).send({
        success:true,
        message:"Category updated successfully"
      })
    } catch (error) {
        res.status(500).send({
          success:false,
          message:"No Category Found"
        })
    }
}
const deleteController = async(req,res)=>{
     try {
      const {id} = req.params
     
      if(!id){
        return res.status(500).send({
          success:false,
          message:"Please provide category"
        })
      }
      const category= await categoryModels.findById(id)
      if(!category){
        return res.status(500).send({
          success:false,
          message:"No category found"
        })
      }
      await categoryModels.findByIdAndDelete(id)
      res.status(200).send({
        success:true,
        message:"Category deleted successfully"
      })
    } catch (error) {
        res.status(500).send({
          success:false,
          message:"No Category Found"
        })
    }
}


const getallcategoryController = async (req,res)=>{
   try{
     const category = await categoryModels.find({})
     if(!category){
      return res.status(404).send({
         success:false,
         message:"No category available"
      })
     }
     res.status(200).send({
      success:"true",
      message:"Category available",
      totalCount:category.length,
      category
     })
   }
   catch(error){
    return res.status(500).send({
      success: false,
      message: "Error in Category API",
      error: error.message,
     
    });
   }
}

module.exports={categoryController,getallcategoryController,updateController,deleteController}