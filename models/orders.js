const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

  items: [{
    itemId : {
      type: "ObjectId",
      ref : "Menu"
    },
    quantity : {
      type : Number,
      required : true
    }
  }],

  tableNo: {
    type: Number,
    required: true,
  },

  amount: {
    itemTotal :{
      type : Number,
      required : true
    },
    afterDiscount :{
      type : Number,
      required : true
    },
    sgst :{
      type : Number,
      required : true
    },
    cgst :{
      type : Number,
      required : true
    },
    totalPay :{
      type : Number,
      required : true
    },
  },

  customerId: {
    type : "ObjectId",
    required: true,
    ref : "Customer"
  },

  payment : {
    paymentMode :{
      type : String,
      required : true,
      enum : ["online", "onCash"]
    },
    status : {
      type : String,
      required : true,
      enum : ["paid", "pending"],
      default : "pending"
    }
  },

  orderStatus: {
    type: String,
    enum: ["Delivered", "Pending", "On Queue", "Rejected", "Cooking"],
    default : "Pending",
    required : true,
  },

  date: {
    type: Date,
    required: true,
  },

});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;

