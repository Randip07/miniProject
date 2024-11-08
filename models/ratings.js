
const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  itemId: {
    type: "ObjectId",
    ref : "Menu",
    required: true,
  },
  
  rating: {
    type: [Number],
    default : []
  }
  
});

const Rating = mongoose.model("Rating", ratingSchema);
module.exports = Rating;
