const express = require("express");
const router = express.Router();
const Menu = require("../models/menu.js");
const Customer = require("../models/customers.js");
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js");


// Rendering client side menu page
router.get("",
  wrapAsync(async (req, res, next) => {
    let data = await Menu.find({}).populate("rating");
    let cartcount = await Customer.findOne({ _id : req.session.userId});
    let count;
    if (!cartcount) {
      count = 0;
    }else{
      count = cartcount.cart.length;
    }
    let categories = [
      "Appetizers",
      "Main-Course",
      "Beverages",
      "Ice-Cream",
      "Drinks",
      "Add-On",
    ];
    res.render("menu.ejs", { items: data, count , categories});
  })
);

module.exports = router