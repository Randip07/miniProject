const mongoose = require("mongoose");
const empData = require("./employees.js");
const menuData = require("./menu.js");
const cusData = require("./customers.js");
const EmpListing = require("../models/employee.js");
const MenuListing = require("../models/menu.js");
const CustListing = require("../models/customers.js");

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

initDB1();
// initDB2();
// initDB();
