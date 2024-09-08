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
  orders: {
    type: [Number],
  },
  rating: {
    type: Number,
  },
});

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
