const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  itemID: {
    type: Number,
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  itemDetails: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: [String],
    enum: [
      "Appetizers",
      "Main-Course",
      "Beverages",
      "Ice-Cream",
      "Drinks",
      "Add-On",
    ],
  },
  discount: {
    type: Number,
  },
  rating: {
    type: [Number],
  },
  availability: {
    type: String,
    enum: ["available", "Not available"],
  },
  type :{
    type : String,
    enum : ["Veg", "Non-Veg"]
  },
  
});

const Menu = mongoose.model("Menu", menuSchema);
module.exports = Menu;
