const Employee = require("../models/employee.js");
const Menu = require("../models/menu.js");
const Customer = require("../models/customers.js");
const Table = require("../models/table.js");
const Order = require("../models/orders.js");
const Deliver = require("../models/delivered.js");
const CancelOrder = require("../models/cancelOrder.js");
const Charge = require("../models/charges.js");
const multer = require("multer");
const { storage } = require("../cloudinaryConfig.js");
const upload = multer({ storage });
const Rating = require("../models/ratings.js");

module.exports.showDashboard = (req, res) => {
   res.render("dashboard.ejs");
};

module.exports.showOrders = async (req, res) => {
   let orderData = await Order.find().populate("customerId");
   let deliveredData = await Deliver.find().populate("customerId").populate("orderId");
   let cancelOrder = await CancelOrder.find().populate("customerId").populate("orderId");
   res.render("orders.ejs", {
      orders: orderData,
      deliveredOrders: deliveredData,
      cancelOrder: cancelOrder,
   });
};

module.exports.viewOrderInfo = async (req, res) => {
   let { id } = req.params;
   let orderData = await Order.findById(id).populate("items.itemId").populate("customerId");
   res.render("viewOrders.ejs", { data: orderData });
};

module.exports.showOrderEditPage = async (req, res) => {
   let { id } = req.params;
   let orderData = await Order.findById(id).populate("items.itemId").populate("customerId");
   res.render("editOrders.ejs", { data: orderData });
};

module.exports.updateOrderData = async (req, res) => {
   let { id } = req.params;
   let { paymentStatus, orderStatus: currOrderStatus } = req.body;
   if (!paymentStatus) {
      await Order.findByIdAndUpdate(id, { orderStatus: currOrderStatus });
   } else {
      await Order.findByIdAndUpdate(id, {
         "payment.status": paymentStatus,
         orderStatus: currOrderStatus,
      });
   }

   if (paymentStatus == "paid" && (currOrderStatus == "Delivered" || currOrderStatus == "Cancelled")) {
      let orderData = await Order.findById(id);
      let newDeliveredOrder = new Deliver({
         orderId: id,
         items: orderData.items,
         totalAmount: orderData.amount.totalPay,
         customerId: orderData.customerId,
         orderStatus: currOrderStatus,
         date: orderData.date,
      });
      await Deliver.insertMany(newDeliveredOrder);
   }

   if (!paymentStatus && (currOrderStatus == "Delivered" || currOrderStatus == "Cancelled")) {
      let orderData = await Order.findById(id);
      let newOrder = new CancelOrder({
         orderId: id,
         items: orderData.items,
         totalAmount: orderData.amount.totalPay,
         customerId: orderData.customerId,
         orderStatus: currOrderStatus,
         date: orderData.date,
      });
      if(currOrderStatus == "Delivered"){
         await Deliver.insertMany(newOrder);
      }else{
         await CancelOrder.insertMany(newOrder);
      }
   }
   req.flash("success", "Order has been updated successfully");
   res.redirect("/dashboard/orders");
};

module.exports.showCustomers = async (req, res) => {
   let data = await Customer.find({}).populate("orders");
   res.render("customer.ejs", { customers: data });
};

module.exports.showEmployees = async (req, res) => {
   let data = await Employee.find({});
   res.render("employees.ejs", { employees: data });
};

module.exports.showEmployeeAddPage = async (req, res) => {
   res.render("newEmp.ejs");
};

module.exports.addNewEmployee = async (req, res) => {
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
   req.flash("success", "Employees details added successfully");
   res.redirect("/dashboard/employee");
};

module.exports.showEditEmployeePage = async (req, res) => {
   let { id } = req.params;
   let empData = await Employee.findById(id);
   res.render("editEmp.ejs", { data: empData });
};

module.exports.updateEmployee = async (req, res) => {
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
   req.flash("success", "Employees details updated successfully");
   res.redirect("/dashboard/employee");
};

module.exports.showMenuPage = async (req, res) => {
   let data = await Menu.find({}).populate("rating").sort({ availability: -1, itemName: 1 });
   let discount = await Charge.findOne();
   discount = discount.discount
   let category = ["Appetizers", "Main-Course", "Beverages", "Ice-Cream", "Drinks", "Add-On"];
   res.render("dashMenu.ejs", { items: data, categories: category , discount});
};

module.exports.showNewItemAddPage = (req, res) => {
   res.render("newItem.ejs");
};

module.exports.addNewItem = async (req, res) => {
   let itemID = await Menu.countDocuments();
   itemID += 11101;

   let newMenuItem = new Menu(req.body.newItem);
   newMenuItem.itemID = itemID;

   if (typeof req.file !== "undefined") {
      newMenuItem.image = {
         url: req.file.path,
         filename: req.file.filename,
      };
   }

   let newItemResult = await newMenuItem.save();
   let newRating = new Rating({
      itemId: newItemResult._id,
   });

   let newRatingResult = await newRating.save();
   newItemResult.rating = newRatingResult._id;
   await newItemResult.save();

   req.flash("success", "Item has been added successfully.");
   res.redirect("/dashboard/menu");
};

module.exports.showEditItemPage = async (req, res) => {
   let { id } = req.params;
   let itemData = await Menu.findById(id);
   res.render("editItem.ejs", { data: itemData });
};

module.exports.updateItemDetails = async (req, res) => {
   let { id } = req.params;
   let newItem = await Menu.findByIdAndUpdate(id, { ...req.body.newItem });

   if (typeof req.file !== "undefined") {
      newItem.image = {
         url: req.file.path,
         filename: req.file.filename,
      };
      await newItem.save();
   }
   req.flash("success", "Item updated successfully");
   res.redirect("/dashboard/menu");
};

module.exports.deleteItem = async (req, res) => {
   let { id } = req.params;
   await Menu.findByIdAndDelete(id);
   req.flash("success", "Item has been deleted successfully.");
   res.redirect("/dashboard/menu");
};

module.exports.showChargesPage = async (req, res) => {
   let data = await Charge.findOne();
   res.render("dashTable.ejs", { data });
};

module.exports.showChargesEditPage = async (req, res) => {
   let data = await Charge.findOne();
   res.render("editCharges.ejs", {data});
};

module.exports.updateCharges = async (req, res) => {
   let newCharges = {
      discount: req.body.discount,
      taxes: { sgst: req.body.sgst, cgst: req.body.cgst },
      platformFee: req.body.platformFee,
   };
   await Charge.updateMany(newCharges);
   res.redirect("/dashboard/charges")
};

module.exports.showDiscounEditPage = (req, res) => {
   res.render("discount.ejs");
};

module.exports.updateDiscount = async (req, res) => {
  //  let result = await Menu.updateMany({}, { discount: req.body.discount });
  await Charge.updateMany({discount : req.body.discount })
  req.flash("success", "Discount has been updated successfully.");
  res.redirect("/dashboard/menu");
};
