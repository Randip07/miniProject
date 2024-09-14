const express = require("express");
const router = express.Router();
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js");


// Landing Page
router.get("/home", ((req, res) => {
  res.render("home.ejs");
}));

// Login Page
router.get("/login", ((req, res) => {
  res.render("login.ejs");
}));

// Table Booking Page
router.get("/booking", ((req, res) => {
  res.render("booking.ejs");
}));

// Rating Page
router.get("/ratings", ((req, res) => {
  res.render("ratings.ejs");
}));

module.exports = router;
