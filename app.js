const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ExpressError = require("./utils/ExpressError.js");
const wrapAsync = require("./utils/wrapAsync.js");
const { error } = require("console");

// Importing routes
const cart = require("./routes/cart.js");
const dashboard = require("./routes/dashboard.js");
const menu = require("./routes/menu.js");
const profile = require("./routes/profile.js");
const landing = require("./routes/landing.js");
const order = require("./routes/order.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const port = 8080;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

main()
  .then((res) => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/restaurent");
}

// Routing
app.use("/", landing)
app.use("/cart", cart);
app.use("/dashboard", dashboard);
app.use("/menu", menu);
app.use("/profile", profile);
app.use("/order", order)


// Middlewares
app.use((err, req, res, next) => {
  let { status = 500, message = "some error" } = err;
  res.status(status).send(message);
  return;
});