const { fileLoader } = require("ejs");
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
    type: "ObjectId",
    ref : "Rating"
  },

  availability: {
    type: String,
    enum: ["available", "Not available"],
  },

  type :{
    type : String,
    enum : ["Veg", "Non-Veg"]
  },

  image : {
    url : {
      type : String,
       default : "https://res.cloudinary.com/dm1lamejc/image/upload/v1730657858/restaurent_Menu_dev/rsm48vfsl9ehmb6zkf8b.jpg",
       set : (v) => v === "" ? "https://res.cloudinary.com/dm1lamejc/image/upload/v1730657858/restaurent_Menu_dev/rsm48vfsl9ehmb6zkf8b.jpg": v
    },
    filename : {
      type : String,
       default : "No Image"
    },
  }
  
});

const Menu = mongoose.model("Menu", menuSchema);
module.exports = Menu;
