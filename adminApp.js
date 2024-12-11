const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const cookieParser = require('cookie-parser');
const session = require('express-session')
const MongoStore = require('connect-mongo');
const passport = require("passport")
const LocalStrategy = require("passport-local")
const Admin = require("./models/admin.js")
const defaultPassword = "QW79ASPO"
const flash = require("connect-flash")

// Importing routes
const dashboard = require("./routes/dashboard.js");
const dashboardApi = require("./routes/dashboardApi.js");
const adminLogin = require("./routes/adminLogin.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(cookieParser())


const localDBUrl = "mongodb://127.0.0.1:27017/restaurent"
const DB_URL = process.env.ATLAS_DB_URL

// mongo session store
const store = MongoStore.create({
  mongoUrl : DB_URL,
  autoRemove: 'native',
  crypto : {
    secret : "VK1880",
  },
  touchAfter : 24 * 3600
})

store.on("error", (err) => {
  console.log("ERROR in MONGO STORE", err);
})

const sessionOptions ={
    store,
  secret : "VK18800",
  resave : false,
  saveUninitialized : true,
  cookie : {
    expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge : 7 * 24 * 60 * 60 * 1000,
    httpOnly : true
  }
}

app.use(session(sessionOptions))
app.use(flash())
app.use((req, res, next) => {
  res.locals.success = req.flash("success")
  res.locals.error = req.flash("error")
  next();
})

// passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Admin.authenticate()))
passport.serializeUser(Admin.serializeUser())
passport.deserializeUser(Admin.deserializeUser())

const port = 8088;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

main()
  .then((res) => {
    console.log("Database connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(DB_URL);
}

// Routing
app.use("/dashboard", dashboard);
app.use("/getDashboardData", dashboardApi)
app.use("/admin", adminLogin);

// Middlewares
app.use((err, req, res, next) => {
  let { status = 500, message = "some error" } = err;
  res.status(status).send(message);
});