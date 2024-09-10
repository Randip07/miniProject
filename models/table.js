const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
  tableNo: {
    type: Number,
    required: true,
  },
  booking: [
    {
      customerId : {
          type: String,
          required:true
      },
      people :{
        type:Number,
        required : true
      },
      date : {
          type: String,
          required:true
      },
      time : {
          start : String,
          end : String
      }
    }
  ],
});

const Table = mongoose.model("Table", tableSchema);
module.exports = Table;

