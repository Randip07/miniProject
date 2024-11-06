const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middlewares.js")
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Customer = require("../models/customers.js");



// Rendering client side profile page
router.get("", isLoggedIn, wrapAsync(async (req, res) => {
  // console.log(req.session.userId);
  
  let data = await Customer.findById(req.session.userId).populate("orders").populate({
    path: 'orders',          // Populates items within each order
    populate: { path: 'items.itemId'}
  })
  data.orders.sort((a, b) => new Date(b.date) - new Date(a.date));
  res.render("profile.ejs", { cusData : data});
}));


// Rendering client side profile/favourites page
router.get("/favourites", isLoggedIn, wrapAsync((req, res) => {
  res.render("favourites.ejs");
}));

router.get("/ratings", ( async (req, res) => {
  res.render("ratings.ejs");
}));

router.get("/logout", (req, res) => {
  // console.log("logout");
  
  // req.logout( (err) => {
  //   if(err){
  //     next(err);
  //   }
  //   req.flash("success", "you are logged out")    
  //   res.redirect("/menu");
  // })

  req.session.destroy();
  res.redirect("/menu")
})

module.exports = router;
