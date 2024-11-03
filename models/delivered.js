const mongoose = require("mongoose");

const deliveredSchema = new mongoose.Schema({

    orderId : {
        type: "ObjectId",
        ref : "Order"
    },

    items: [{
        itemId : {
        type: "ObjectId",
        ref : "Menu"
        },
        quantity : {
        type : Number,
        required : true
        }
    }],

    totalAmount: {
        type : Number,
        required : true
    },

    customerId: {
        type : "ObjectId",
        required: true,
        ref : "Customer"
    },

    orderStatus: {
        type: String,
        enum: ["Delivered", "Rejected"],
        required : true,
    },

    date: {
        type: Date,
        required: true,
    },

});

const Deliver = mongoose.model("Deliver", deliveredSchema);
module.exports = Deliver;

