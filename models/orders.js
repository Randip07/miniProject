const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderId: {
    type: Number,
    required: true,
  },
  itemId: {
    type: [Number],
    required: true,
  },
  table: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  customerId: {
    type: Number,
    required: true,
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

const Order = mongoose.model("Order", orderSchemaSchema);
module.exports = Order;

