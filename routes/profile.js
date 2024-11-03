const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middlewares.js")
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js");



// Rendering client side profile page
router.get("", isLoggedIn, wrapAsync((req, res) => {
  res.render("profile.ejs");
}));


// Rendering client side profile/favourites page
router.get("/favourites", wrapAsync((req, res) => {
  res.render("favourites.ejs");
}));

module.exports = router;
