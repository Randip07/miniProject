const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middlewares.js")
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Customer = require("../models/customers.js");



// Rendering client side profile page
router.get("", wrapAsync(async (req, res) => {
  let data = await Customer.findById("6725ba4e2cb5b4d3bab11c63").populate("orders");
  res.render("profile.ejs", { cusData : data});
}));


// Rendering client side profile/favourites page
router.get("/favourites", wrapAsync((req, res) => {
  res.render("favourites.ejs");
}));

module.exports = router;
