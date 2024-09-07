const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    employeeId : {
        type : Number,
        required : true,
    },
    name : {
        type : String,
        required : true,
    },
    age : {
        type : Number,
        min : [18 , "minimum age is 18"]
    },
    location : {
        city : String,
        state : {
            type : String,
            default : "Assam"
        }
    },
    contactNo : {
        type : Number,
        required : true
    },
    gender : {
        type : String,
        enum : ["Male", "Female"]
    },
    salary : {
        type : Number,
        required : true
    },
    post : {
        type : String,
        required : true
    },
    joiningDate : {
        type: Date,
        required :true
    } 
});

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee