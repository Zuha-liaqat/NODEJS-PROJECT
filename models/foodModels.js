const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Food title is required"]
  },
  price: {
    type: Number,
    required: [true, "Price is required"]
  },
  rating: {
    type: Number,
    default: 1,
    min: 1,
    max: 5
  },
  imageurl: {
    type: String,
  },
  description: {
    type: String
  },
  foodTags: {
    type: String
  },

  

}, { timestamps: true });

module.exports = mongoose.model("Food", foodSchema);
