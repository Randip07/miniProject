const mongoose = require("mongoose");
const empData = require("./employees.js");
const menuData = require("./menu.js");
const cusData = require("./customers.js");
const tableData = require("./table.js");
const orderData = require("./orders.js");
const EmpListing = require("../models/employee.js");
const MenuListing = require("../models/menu.js");
const CustListing = require("../models/customers.js");
const TableListing = require("../models/table.js");
const OrderListing = require("../models/orders.js");

main()
  .then((res) => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/restaurent");
}

const initDB = async () => {
  await EmpListing.deleteMany({});
  await EmpListing.insertMany(empData.data);
  console.log("Employee data initialized");
};

const initDB1 = async () => {
  await MenuListing.deleteMany({});
  await MenuListing.insertMany(menuData.data);
  console.log("Menu data initialized");
};

const initDB2 = async () => {
  await CustListing.deleteMany({});
  await CustListing.insertMany(cusData.data);
  console.log("Customer data initialized");
};

const initDB3 = async () => {
  await TableListing.deleteMany({});
  await TableListing.insertMany(tableData.data);
  console.log("table data initialized");
};

const initDB4 = async () => {
  await OrderListing.deleteMany({});
  await OrderListing.insertMany(orderData.data);
  console.log("Order data initialized");
};

// initDB1();
// initDB2();
// initDB();
//  initDB3();
// initDB4();

