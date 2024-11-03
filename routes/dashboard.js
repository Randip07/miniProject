const express = require("express");
const router = express.Router();
const Employee = require("../models/employee.js");
const Menu = require("../models/menu.js");
const Customer = require("../models/customers.js");
const Table = require("../models/table.js");
const Order = require("../models/orders.js");
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js");

// Rendering Dashboard Page
router.get(
  "",
  ((req, res) => {
    res.render("dashboard.ejs");
  })
);

// Rendering Dashboard/orders Page
router.get(
  "/orders",
  wrapAsync(async (req, res) => {
    let orderData = await Order.find().populate("customerId");
    res.render("orders.ejs", { orders: orderData });
  })
);

// Rendering Dashboard/orders/view Page
router.get(
  "/orders/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let orderData = await Order.findById(id)
      .populate("items.itemId")
      .populate("customerId");
    res.render("viewOrders.ejs" , {data : orderData});
  })
);


// Rendering Dashboard/orders/edit Page
router.get(
  "/orders/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let orderData = await Order.findById(id)
      .populate("items.itemId")
      .populate("customerId");
    res.render("editOrders.ejs" , {data : orderData});
  })
);


// Updating order status in Database
router.put("/orders/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let { paymentStatus , orderStatus } = req.body
    if(!paymentStatus){
      await Order.findByIdAndUpdate(id, { orderStatus : orderStatus })
    }else{
      await Order.findByIdAndUpdate(id, { "payment.status" : paymentStatus, orderStatus : orderStatus})
    }
    res.redirect("/dashboard/orders")
  })
);


// Rendering Dashboard/customers Page
router.get(
  "/customers",
  wrapAsync(async (req, res) => {
    let data = await Customer.find({}).populate("orders");
    res.render("customer.ejs", { customers: data });
  })
);

// Rendering Dashboard/employee Page
router.get(
  "/employee",
  wrapAsync(async (req, res) => {
    let data = await Employee.find({});
    res.render("employees.ejs", { employees: data });
  })
);

// New Employee adding Page
router.get(
  "/employee/new",
  wrapAsync(async (req, res) => {
    res.render("newEmp.ejs");
  })
);

// New Employee Adding in Database
router.post(
  "/employee",
  wrapAsync(async (req, res) => {
    let employeeId = await Employee.countDocuments();
    employeeId += 10100;

    let newEmployee = new Employee({
      employeeId: employeeId,
      name: req.body.name,
      age: req.body.age,
      location: {
        city: req.body.city,
      },
      contactNo: "91" + req.body.contactNo,
      gender: req.body.gender,
      salary: req.body.salary,
      post: req.body.post,
      joiningDate: new Date(),
    });

    await newEmployee.save();
    req.flash("success", "Employees details added successfully")
    res.redirect("/dashboard/employee");
  })
);

// Rendering Editing Employeee Details Page
router.get(
  "/employee/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let empData = await Employee.findById(id);
    res.render("editEmp.ejs", { data: empData });
  })
);

// Updating Employee Details in Database
router.put(
  "/employee/:id",
  wrapAsync(async (req, res) => {
    
    let { id } = req.params;
    // console.log(id);
    let newData = {
      name: req.body.name,
      age: req.body.age,
      location: {
        city: req.body.city,
      },
      contactNo: "91" + req.body.contactNo,
      gender: req.body.gender,
      salary: req.body.salary,
      post: req.body.post,
    };
    // console.log(newData);
    let empData = await Employee.findByIdAndUpdate(id, newData);
    // console.log(empData);
    req.flash("success", "Employees details updated successfully")
    res.redirect("/dashboard/employee");
  })
);

// Rending Dashboard/menu Page
router.get(
  "/menu",
  wrapAsync(async (req, res) => {
    let data = await Menu.find({});
    let category = [
      "Appetizers",
      "Main-Course",
      "Beverages",
      "Ice-Cream",
      "Drinks",
      "Add-On",
    ];
    res.render("dashMenu.ejs", { items: data, categories: category });
  })
);

// Rendering adding new item page
router.get(
  "/menu/new",
  wrapAsync((req, res) => {
    res.render("newItem.ejs");
  })
);

// Rendering Editing item details page
router.get(
  "/menu/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let itemData = await Menu.findById(id);
    res.render("editItem.ejs", { data: itemData });
  })
);

// Updating Item details in Database
router.put(
  "/menu/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let newData = req.body
    let resu = await Menu.updateOne({_id : id}, newData);
    req.flash("success", "Item updated successfully")
    res.redirect("/dashboard/menu");
  })
);

// Adding new item in Database
router.post(
  "/menu",
  wrapAsync(async (req, res) => {
    let itemID = await Menu.countDocuments();
    itemID += 11101;

    let newMenuItem = new Menu({
      itemID: itemID,
      itemName: req.body.itemName,
      itemDetails: req.body.itemDetails,
      price: req.body.price,
      category: req.body.category,
      discount: req.body.discount,
      availability: req.body.availability,
      type: req.body.type,
    });

    await newMenuItem.save();
    req.flash("success", "Item has been added successfully.")
    res.redirect("/dashboard/menu");
  })
);

router.delete("/menu/:id", async(req, res) => {
  let { id } = req.params;
  await Menu.findByIdAndDelete(id);
  req.flash("success", "Item has been deleted successfully.")
  res.redirect("/dashboard/menu")
})

//Rendering Dashboard/table Pafe
router.get(
  "/table",
  wrapAsync(async (req, res) => {
    let data = await Table.find();
    res.render("dashTable.ejs", { tables: data });
  })
);

// Rendering Dashboard/table/view page
router.get(
  "/table/view/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let data = await Table.findById(id);
    res.render("dashTableView.ejs", { data });
  })
);

module.exports = router;
