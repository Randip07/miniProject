const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const Admin = require("../models/admin.js");
const adminLoginController = require("../controller/adminLoginController.js");
const client = require("twilio")(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Render Login Page
router.get("/login", adminLoginController.renderLoginPage);

// Sign up Page
router.get("/signup", adminLoginController.renderSignUpPage);

// User Login
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/admin/login",
    failureFlash: true,
  }),
  wrapAsync(adminLoginController.loginUser)
);

// User Sign Up
router.post("/signup", adminLoginController.signUp);

// Auth Page render
router.get("/auth-otp", adminLoginController.renderAuthOtp);

// authentication
router.post("/auth-otp", adminLoginController.signUpAuth);

module.exports = router;
