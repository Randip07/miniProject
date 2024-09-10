const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderId: {
    type: Number,
    required: true,
  },
  items: [{
      type : "ObjectId",
      ref : "Menu"
  }],
  tableNo: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
  },
  customerId: {
    type: Number,
    required: true,
    ref : "customers"
  },
  orderStatus: {
    type: String,
    enum: ["Delivered", "Pending", "On Queue", "Rejected", "Cooking"],
  },
  date: {
    type: Date,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;

