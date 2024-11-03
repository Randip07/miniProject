const { name } = require("ejs");
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose")

const customerSchema = new mongoose.Schema({
  name : {
    type : String,
    required :true,
    default : "User"
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

  // cart : [{
  //   type : "ObjectId",
  //   ref : "Menu"
  // }],

  cart : [{
    itemId : {
      type: "ObjectId",
      ref : "Menu"
    },
    quantity : {
      type : Number,
      default :1,
      required : true
    }
  }]
});

customerSchema.plugin(passportLocalMongoose);

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;
