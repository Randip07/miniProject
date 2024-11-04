const express = require("express");
const router = express.Router();
const Customer = require("../models/customers.js");
const Order = require("../models/orders.js");
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { now } = require("mongoose");




// ordering item
router.post("/:id", wrapAsync( async (req, res, next) => {
    let { id } = req.params
    let {tableNo, paymentOp} = req.body

    let cusData = await Customer.findById(id).populate("cart.itemId");
    let cartItems = cusData.cart
    let calucalatedPrice = {
        platformFee : 10,
        itemTotal : 0,
        afterDiscount : 0,
        sgst : 0,
        cgst : 0,
        totalPay : 0
    }
    for(item of cartItems){
        calucalatedPrice.itemTotal += item.quantity*item.itemId.price
        calucalatedPrice.afterDiscount += Math.ceil(item.quantity*(item.itemId.price - (item.itemId.price*(item.itemId.discount/100))));
    }
    calucalatedPrice.sgst = Math.ceil(calucalatedPrice.afterDiscount*(2.5/100));
    calucalatedPrice.cgst = Math.ceil(calucalatedPrice.afterDiscount*(2.5/100));
    calucalatedPrice.totalPay = Math.ceil(calucalatedPrice.afterDiscount + calucalatedPrice.platformFee + calucalatedPrice.sgst + calucalatedPrice.cgst); 

    let order = new Order({
        items : cusData.cart,
        tableNo : Number(tableNo),
        amount : calucalatedPrice,
        customerId : id,
        payment : {
            paymentMode : paymentOp,
        },
        date : new Date()
    })

    let result = await order.save();
    await Customer.findOneAndUpdate({_id : id}, { cart : [], $push: { orders: result._id }})
    res.redirect("/home")
}))

module.exports = router