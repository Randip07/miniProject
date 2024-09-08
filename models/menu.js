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
  availablity: {
    type: String,
    enum: ["available", "Not available"],
  },
});

const Menu = mongoose.model("Menu", menuSchema);
module.exports = Menu;
