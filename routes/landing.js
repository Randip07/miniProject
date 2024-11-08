if(process.env.NODE_ENV != "production"){
  require('dotenv').config()
}

const express = require("express");
const router = express.Router();
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const Customer = require("../models/customers.js");
const { Redirect } = require("twilio/lib/twiml/VoiceResponse.js");
const client = require('twilio')( process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN );

let otp = "";
function generateOtp(){
  otp = "";
  let digits = "0123456789"
  for(let i=0; i<4; i++){
    otp += digits[Math.floor(Math.random()*10)]
  }

  client.messages
  .create({
    body: `Your One Time Password is ${otp}. Valid for 2 minutes. Please do not share the OTP. --The Grand Eclat`,
    from: '+14066620709',
    to: '+917086552655', // Text your number
  })
}


// Landing Page
router.get("/home", ((req, res) => {
  res.render("home.ejs");
}));

// Login Page
router.get("/login", ((req, res) => {
  res.render("login.ejs", { data : " "});
}));

// Sign up Page
router.get("/signup", ((req, res) => {
  res.render("signUp.ejs", { data : " "});
}));

router.post("/login",  passport.authenticate("local", {failureRedirect : "/login", failureFlash : true}),
  wrapAsync( async (req, res) => {
    let contactNo = "91" + req.body.username;
    let user = await Customer.findOne({contactNo : contactNo})
    req.session.userId = user._id;
    req.flash("success", "Login Successfull")
    res.redirect("/menu")

}));

router.post("/signup", ((req, res) => {
    req.session.name = req.body.name,
    req.session.contactNo = "91" + req.body.contactNo
    req.session.username = req.body.contactNo
    res.redirect("/auth-otp")
  }
));

router.get("/auth-otp", (req, res) =>{
  generateOtp();
  res.render("otp_auth.ejs", { data : " "})
})

router.post("/auth-otp", async (req, res) =>{
  // console.log(req.body);
  // console.log(otp);
  
  try{
    if(otp == req.body.otp){
      let newCustomer = new Customer({
        name : req.session.name,
        username : req.session.username,
        contactNo : req.session.contactNo
      })
      let registeredUser = await Customer.register(newCustomer, req.body.password)
      let user = await Customer.findOne({contactNo : req.session.contactNo})
      // console.log(user);
      
      req.login(registeredUser, async (err) => {
        if(err){
          return next(err);
        }
        req.session.userId = user._id;
        res.redirect("/menu")
      })
    }else{
      req.flash("error", "Incorrect OTP. Please try again.")
      res.redirect("/auth-otp")
    }
  }catch(err){
    req.flash("error", err.message);
    res.redirect("/Signup")
  }
})

// Table Booking Page
router.get("/booking", ((req, res) => {
  res.render("booking.ejs");
}));

module.exports = router;
