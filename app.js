const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Employee = require("./models/employee.js");
const Menu = require("./models/menu.js");
const Customer = require("./models/customers.js");
const { name } = require("ejs");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended : true}));

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

app.get("/", (req, res) => {
  res.redirect("/home");
});

app.get("/home", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/booking", (req, res) => {
  res.render("booking.ejs");
});

app.get("/menu", async (req, res) => {
  let data = await Menu.find({});
  res.render("menu.ejs", { items: data });
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard.ejs");
});

app.get("/dashboard/orders", (req, res) => {
  res.render("orders.ejs");
});

app.get("/dashboard/customers", async (req, res) => {
  let data = await Customer.find({});
  res.render("customer.ejs", { customers: data });
});

app.get("/dashboard/employee", async (req, res) => {
  let data = await Employee.find({});
  res.render("employees.ejs", { employees: data });
});

app.get("/dashboard/employee/new", async (req, res) => {
    res.render("newEmp.ejs");
});

app.post("/dashboard/employee", async (req, res) => {
    let employeeId = await Employee.countDocuments();
    employeeId += 10100;
    
    let newEmployee = new Employee({
        employeeId : employeeId,
        name : req.body.name,
        age : req.body.age,
        location : {
            city : req.body.city
        },
        contactNo : "91" + req.body.contactNo,
        gender : req.body.gender,
        salary :  req.body.salary,
        post :  req.body.post,
        joiningDate :  new Date(),
    })

    await newEmployee.save();
    res.redirect("/dashboard/employee");
});

app.get("/dashboard/employee/:id", async (req, res) => {
    res.render("newEmp.ejs");
});

app.get("/ratings", (req, res) => {
  res.render("ratings.ejs");
});

app.get("/dashboard/menu1", async (req, res) => {
  let data = await Menu.find({});
  res.render("menu1.ejs", { items: data });
});

app.get("/dashboard/menu1/new", (req, res) => {
  res.render("newItem.ejs")
});