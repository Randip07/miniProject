if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const router = express.Router();
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js");
const multer = require("multer");
const { storage } = require("../cloudinaryConfig.js");
const upload = multer({ storage });
const { isAdminLoggedIn } = require("../middlewares.js");
const { log10 } = require("chart.js/helpers");
const dashboardController = require("../controller/dashboardController.js");

// routes

// Rendering Dashboard Page
router.get("", isAdminLoggedIn, dashboardController.showDashboard);

// Rendering Dashboard/orders Page
router.get("/orders", isAdminLoggedIn, wrapAsync(dashboardController.showOrders));

// Rendering Dashboard/orders/view Page
router.get("/orders/:id", isAdminLoggedIn, wrapAsync(dashboardController.viewOrderInfo));

// Rendering Dashboard/orders/edit Page
router.get("/orders/:id/edit", isAdminLoggedIn, wrapAsync(dashboardController.showOrderEditPage));

// Updating order status in Database
router.put("/orders/:id", wrapAsync(dashboardController.updateOrderData));

// Rendering Dashboard/customers Page
router.get("/customers", isAdminLoggedIn, wrapAsync(dashboardController.showCustomers));

// Rendering Dashboard/employee Page
router.get("/employee", isAdminLoggedIn, wrapAsync(dashboardController.showEmployees));

// New Employee adding Page
router.get("/employee/new", isAdminLoggedIn, wrapAsync(dashboardController.showEmployeeAddPage));

// New Employee Adding in Database
router.post("/employee", wrapAsync(dashboardController.addNewEmployee));

// Rendering Editing Employeee Details Page
router.get("/employee/:id/edit", isAdminLoggedIn, wrapAsync(dashboardController.showEditEmployeePage));

// Updating Employee Details in Database
router.put("/employee/:id", wrapAsync(dashboardController.updateEmployee));

// Rending Dashboard/menu Page
router.get("/menu", isAdminLoggedIn, wrapAsync(dashboardController.showMenuPage));

// Rendering adding new item page
router.get("/menu/new", isAdminLoggedIn, wrapAsync(dashboardController.showNewItemAddPage));

// Adding new item in Database
router.post("/menu", upload.single("newItem[itemImage]"), wrapAsync(dashboardController.addNewItem));

// Rendering Editing item details page
router.get("/menu/:id/edit", isAdminLoggedIn, wrapAsync(dashboardController.showEditItemPage));

// Updating Item details in Database
router.put("/menu/:id", upload.single("newItem[itemImage]"), wrapAsync(dashboardController.updateItemDetails));

// Delete Item from database
router.delete("/menu/:id", wrapAsync(dashboardController.deleteItem));

// discount page
router.get("/menu/discount", isAdminLoggedIn, dashboardController.showDiscounEditPage);

// disocunt update
router.post("/menu/discount", isAdminLoggedIn, dashboardController.updateDiscount);

//Rendering Dashboard/Charges Page
router.get("/charges", isAdminLoggedIn, wrapAsync(dashboardController.showChargesPage));

// Rendering Dashboard/charges/Edit page
router.get("/charges/edit", isAdminLoggedIn, wrapAsync(dashboardController.showChargesEditPage));

// Upadating Charges
router.post("/charges", isAdminLoggedIn, wrapAsync(dashboardController.updateCharges));

module.exports = router;
