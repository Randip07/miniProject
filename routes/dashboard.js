if(process.env.NODE_ENV != "production"){
  require('dotenv').config()
}

const express = require("express");
const router = express.Router();
const app = express();
const Employee = require("../models/employee.js");
const Menu = require("../models/menu.js");
const Customer = require("../models/customers.js");
const Table = require("../models/table.js");
const Order = require("../models/orders.js");
const Deliver = require("../models/delivered.js");
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js");
const multer = require("multer");
const { storage } = require("../cloudinaryConfig.js");
const upload = multer( {storage} )
const { isAdminLoggedIn } = require("../middlewares.js");

// routes 

// Rendering Dashboard Page
router.get(
  "",
  isAdminLoggedIn,
  ((req, res) => {
    res.render("dashboard.ejs");
  })
);

// Rendering Dashboard/orders Page
router.get(
  "/orders",
  isAdminLoggedIn,
  wrapAsync(async (req, res) => {
    let orderData = await Order.find().populate("customerId");
    let deliveredData = await Deliver.find().populate("customerId").populate("orderId")
    res.render("orders.ejs", { orders: orderData , deliveredOrders : deliveredData});
  })
);

// Rendering Dashboard/orders/view Page
router.get(
  "/orders/:id",
  isAdminLoggedIn,
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
  isAdminLoggedIn,
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
    let { paymentStatus , orderStatus : currOrderStatus  } = req.body
    if(!paymentStatus){
      await Order.findByIdAndUpdate(id, { orderStatus : currOrderStatus })
    }
    else{
      await Order.findByIdAndUpdate(id, { "payment.status" : paymentStatus, orderStatus : currOrderStatus})
    }

    if(paymentStatus=="paid" && (currOrderStatus == "Delivered" || currOrderStatus == "Rejected")){
      let orderData = await Order.findById(id);
      let newDeliveredOrder = new Deliver({
        orderId : id,
        items : orderData.items,
        totalAmount : orderData.amount.totalPay,
        customerId : orderData.customerId,
        orderStatus : currOrderStatus,
        date : orderData.date
      })
      await Deliver.insertMany(newDeliveredOrder);
    }

    if(!paymentStatus && (currOrderStatus == "Delivered" || currOrderStatus == "Rejected")){
      let orderData = await Order.findById(id);
      let newDeliveredOrder = new Deliver({
        orderId : id,
        items : orderData.items,
        totalAmount : orderData.amount.totalPay,
        customerId : orderData.customerId,
        orderStatus : currOrderStatus,
        date : orderData.date
      })
      await Deliver.insertMany(newDeliveredOrder)
    }
    req.flash("success","Order has been updated successfully")
    res.redirect("/dashboard/orders")
  })
);


// Rendering Dashboard/customers Page
router.get(
  "/customers",
  isAdminLoggedIn,
  wrapAsync(async (req, res) => {
    let data = await Customer.find({}).populate("orders");
    res.render("customer.ejs", { customers: data });
  })
);

// Rendering Dashboard/employee Page
router.get(
  "/employee",
  isAdminLoggedIn,
  wrapAsync(async (req, res) => {
    let data = await Employee.find({});
    res.render("employees.ejs", { employees: data });
  })
);

// New Employee adding Page
router.get(
  "/employee/new",
  isAdminLoggedIn,
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
  isAdminLoggedIn,
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
  isAdminLoggedIn,
  wrapAsync(async (req, res) => {
    let data = await Menu.find({}).populate("rating");
  
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
  isAdminLoggedIn,
  wrapAsync((req, res) => {
    res.render("newItem.ejs");
  })
);

// disocunt update
router.post("/menu/discount",isAdminLoggedIn, async (req, res) => {
  let result  = await Menu.updateMany({}, {discount : req.body.discount})
  res.redirect("/dashboard/menu")
})

// Rendering Editing item details page
router.get(
  "/menu/:id/edit",
  isAdminLoggedIn,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let itemData = await Menu.findById(id);
    res.render("editItem.ejs", { data: itemData });
  })
);

// discount page
router.get("/menu/discount", isAdminLoggedIn, (req, res) => {
  res.render("discount.ejs");
})



// Updating Item details in Database
router.put(
  "/menu/:id",
  upload.single('itemImage'),
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let newData = req.body;
    newData.image = {
      url : req.file.path,
      filename : req.file.filename
    }
    let resu = await Menu.findByIdAndUpdate(id, newData);
    req.flash("success", "Item updated successfully")
    res.redirect("/dashboard/menu");
  })
);

// Adding new item in Database
router.post(
  "/menu",
  upload.single('itemImage'),
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
      image : {
        url : req.file.path,
        filename : req.file.filename
      }
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
  isAdminLoggedIn,
  wrapAsync(async (req, res) => {
    let data = await Table.find();
    res.render("dashTable.ejs", { tables: data });
  })
);

// Rendering Dashboard/table/view page
router.get(
  "/table/view/:id",
  isAdminLoggedIn,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let data = await Table.findById(id);
    res.render("dashTableView.ejs", { data });
  })
);

module.exports = router;
