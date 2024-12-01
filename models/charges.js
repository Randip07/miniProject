const mongoose = require("mongoose");

const chargesSchema = new mongoose.Schema({

    discount  : {
        type : Number
    },
    taxes : {
        sgst : Number,
        cgst : Number
    },
    platformFee : Number

});

const Charge = mongoose.model("Charge", chargesSchema);
module.exports = Charge;

