const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  customerId: {
    type: Number,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  contactNo: {
    type: Number,
    required: true,
  },

  orders: [{
    type : "ObjectId",
    ref : "Order"
}],

  rating: {
    type: Number,
  },

  cart : [{
    type : "ObjectId",
    ref : "Menu"
}]
});

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
