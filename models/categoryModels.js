const mongoose = require("mongoose")

const categorySchema= new mongoose.Schema({

    title:{
        type:String,
        required:[true,"Restuarant title is required"]
    },
   
    imageurl:{
        type:String,
    },
    foods: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food"
    }
  ]

   


},{timestamps: true})
module.exports = mongoose.model('Category',categorySchema)