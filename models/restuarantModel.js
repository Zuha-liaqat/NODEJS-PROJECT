const mongoose = require("mongoose")

const restuarantSchema= new mongoose.Schema({

    title:{
        type:String,
        required:[true,"Restuarant title is required"]
    },
    food:{
        type:Array,
    },
     categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", 
    },
  ],
    imageurl:{
        type:String,
    },
    description:{
        type:String
    },
    time:{
        type:String,
    },
    pickup:{
        type:Boolean,
        default:true
    },
    delivery:{
        type:Boolean,
        default:true
    },
    isOpen:{
        type:Boolean
    },
    rating:{
        type:Number,
        default:1,
        min:1,
        max:5
    },
    ratingCount:{
        type:String
    },
    coords:{
        id:{type:String},
        latitude:{type:Number},
        latitudeDelta:{type:Number},
        longitude:{type:Number},
        longitudeDelta:{type:Number},
        address:{type:String},
        title:{type:String}
    },
    


},{timestamps: true})
module.exports = mongoose.model('Restuarant',restuarantSchema)