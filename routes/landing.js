if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");

const landingController = require("../controller/landingController.js");

// Landing Page
router.get("/home", landingController.renderLandingPage);

// Login Page
router.get("/login", landingController.renderLoginPage);

// Sign up Page
router.get("/signup", landingController.renderSignUpPage);

// Login User
router.post("/login", passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), wrapAsync(landingController.loginUser));

// Sign Up
router.post("/signup", landingController.signUp);

// auth-otp
router.get("/auth-otp", landingController.renderAuthOtp);

// authentication
router.post("/auth-otp", landingController.signUpAuth);

module.exports = router;
