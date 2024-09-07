const mongoose = require('mongoose');
const empData = require("./employee.js");
const EmpListing = require("../models/employee.js")

main()
.then((res) => {
    console.log("connection successful")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/restaurent');
}

const initDB = async ()=>{
    await EmpListing.deleteMany({});
    await EmpListing.insertMany(empData.data);
    console.log("data initialized");
}

initDB();