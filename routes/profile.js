const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middlewares.js");
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js");
const profileController = require("../controller/profileController.js");

// Rendering client side profile page
router.get("", isLoggedIn, wrapAsync(profileController.showProfilePage));

// show Rating Page
router.get("/ratings/:id", wrapAsync(profileController.showRatingPage));

// Update Ratings
router.post("/ratings/:id", wrapAsync(profileController.updateRating));

// logout user
router.get("/logout", wrapAsync(profileController.logOutUser));

module.exports = router;
