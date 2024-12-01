const mongoose = require("mongoose");

const cancelOrderSchema = new mongoose.Schema({

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
        default: "Cancelled",
    },

    date: {
        type: Date,
        required: true,
    },

});

const CancelOrder = mongoose.model("CancelOrder", cancelOrderSchema);
module.exports = CancelOrder;

