const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middlewares.js")
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Customer = require("../models/customers.js");



// Rendering client side profile page
router.get("", isLoggedIn, wrapAsync(async (req, res) => {
  let data = await Customer.findById(req.session.userId).populate("orders").populate({
    path: 'orders',          // Populates items within each order
    populate: { path: 'items.itemId'}
  })
  data.orders.sort((a, b) => new Date(b.date) - new Date(a.date));
  res.render("profile.ejs", { cusData : data});
}));


// Rendering client side profile/favourites page
router.get("/favourites", wrapAsync((req, res) => {
  res.render("favourites.ejs");
}));

module.exports = router;
