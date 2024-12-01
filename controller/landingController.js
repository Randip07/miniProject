if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const Charge = require("../models/charges.js");
const Customer = require("../models/customers.js");
const client = require("twilio")(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// OTP FUNCTION
let otp = "";
function generateOtp() {
  otp = "";
  let digits = "0123456789";
  for (let i = 0; i < 4; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }

  client.messages.create({
    body: `Your One Time Password is ${otp}. Valid for 2 minutes. Please do not share the OTP. --The Grand Eclat`,
    from: "+14066620709",
    to: "+917086552655", // Text your number
  });
}

module.exports.renderLandingPage = async (req, res) => {
  let discount = await Charge.findOne();
  discount = discount.discount
  res.render("home.ejs", { discount});
};

module.exports.renderLoginPage = (req, res) => {
  res.render("login.ejs", { data: " " });
};

module.exports.renderSignUpPage = (req, res) => {
  res.render("signUp.ejs", { data: " " });
};

module.exports.loginUser = async (req, res) => {
  let contactNo = "91" + req.body.username;
  let user = await Customer.findOne({ contactNo: contactNo });
  req.session.userId = user._id;
  req.flash("success", "Login Successfull");
  res.redirect("/menu");
};

module.exports.signUp = (req, res) => {
  (req.session.name = req.body.name), (req.session.contactNo = "91" + req.body.contactNo);
  req.session.username = req.body.contactNo;
  res.redirect("/auth-otp");
};

module.exports.renderAuthOtp = (req, res) => {
  generateOtp();
  res.render("otp_auth.ejs", { data: " " });
};

module.exports.signUpAuth = async (req, res) => {
  // console.log(req.body);
  // console.log(otp);

  try {
    if (otp == req.body.otp) {
      let newCustomer = new Customer({
        name: req.session.name,
        username: req.session.username,
        contactNo: req.session.contactNo,
      });
      let registeredUser = await Customer.register(newCustomer, req.body.password);
      let user = await Customer.findOne({ contactNo: req.session.contactNo });
      // console.log(user);

      req.login(registeredUser, async (err) => {
        if (err) {
          return next(err);
        }
        req.session.userId = user._id;
        res.redirect("/menu");
      });
    } else {
      req.flash("error", "Incorrect OTP. Please try again.");
      res.redirect("/auth-otp");
    }
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/Signup");
  }
};
