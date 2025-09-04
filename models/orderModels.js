const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({


  payment:{},
  buyer:{
   type: mongoose.Schema.Types.ObjectId,
   ref: "User",
  },

  status:{
    type:String,
    enum:["preparing","prepare","on the way","delivered"],
    default: "preparing",
  },
  foods: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Food",
    required: true
  }]

}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
