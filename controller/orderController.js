const Customer = require("../models/customers.js");
const Order = require("../models/orders.js");
const CancelOrder = require("../models/cancelOrder.js");
const Charge = require("../models/charges.js");

module.exports.orderingItem = async (req, res, next) => {
  let userId  = req.session.userId;
  let { tableNo, paymentOp } = req.body;

  let cusData = await Customer.findById(userId).populate("cart.itemId");
  let charges = await Charge.findOne();

  let cartItems = cusData.cart;
  let calucalatedPrice = {
    platformFee: 10,
    itemTotal: 0,
    afterDiscount: 0,
    sgst: 0,
    cgst: 0,
    totalPay: 0,
  };
  for (item of cartItems) {
    calucalatedPrice.itemTotal += item.quantity * item.itemId.price;
    calucalatedPrice.afterDiscount += Math.ceil(item.quantity * (item.itemId.price - item.itemId.price * (charges.discount / 100)));
  }
  calucalatedPrice.sgst = Math.ceil(calucalatedPrice.afterDiscount * (charges.taxes.sgst / 100));
  calucalatedPrice.cgst = Math.ceil(calucalatedPrice.afterDiscount * (charges.taxes.cgst / 100));
  calucalatedPrice.totalPay = Math.ceil(calucalatedPrice.afterDiscount + charges.platformFee + calucalatedPrice.sgst + calucalatedPrice.cgst);

  let order = new Order({
    items: cusData.cart,
    tableNo: Number(tableNo),
    amount: calucalatedPrice,
    customerId: userId,
    payment: {
      paymentMode: paymentOp,
    },
    date: new Date(),
  });
  
  let result = await order.save();
  await Customer.findOneAndUpdate({ _id: userId }, { cart: [], $push: { orders: result._id } });
  res.redirect("/profile");
};

module.exports.orderCancel = async (req, res, next) => {
  let { id } = req.params;
  await Order.findByIdAndUpdate(id, {orderStatus : "Cancelled"})
  let orderData = await Order.findById(id);
    let newCancelOrder = new CancelOrder({
      orderId : id,
      items : orderData.items,
      totalAmount : orderData.amount.totalPay,
      customerId : orderData.customerId,
      date : orderData.date
    })
    await CancelOrder.insertMany(newCancelOrder)
  res.redirect("/profile");
};
