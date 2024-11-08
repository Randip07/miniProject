const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose")

const adminSchema = new mongoose.Schema({
  name : {
    type : String,
    required :true,
    default : "User"
  },
  
  contactNo: {
    type: Number,
    required: true,
  },

  Date : {
    type : Date,
    default : new Date()
  }
});

adminSchema.plugin(passportLocalMongoose);

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
