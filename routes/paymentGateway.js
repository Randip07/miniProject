const express = require("express");
const router = express.Router();
const axios = require("axios");
const uniqid = require("uniqid");
const sha256 = require("sha256");
const { route } = require("./cart");
const wrapAsync = require("../utils/wrapAsync");
const Customer = require("../models/customers.js")
const Order = require("../models/orders.js")
// testing
const PHONE_PE_HOST_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox";
// const MERCHANT_ID = "PGTESTPAYUAT";
const MERCHANT_ID = "ATMOSTUAT";
const SALT_INDEX = 1;
// const SALT_KEY = "099ebOcd-02cf-4e2a-8aca-3e6c6aff0399";
const SALT_KEY = "58a63b64-574d-417a-9214-066bee1e4caa";


router.post("/initiate_payment", async (req, res) => {
  req.session.tableNo = req.body.tableNo;
  let result = await calculateTotalPrice(req.session.userId);
  let amount = result.calucalatedPrice * 100;
  const payEndPoint = "/pg/v1/pay";
  const merchantTransactionId = uniqid();
  const merchantUserId = 123;
  const payLoad = {
    merchantId: MERCHANT_ID,
    merchantTransactionId: merchantTransactionId,
    merchantUserId: merchantUserId,
    amount: amount,
    redirectUrl: `https://restaurent-project.onrender.com/payment/redirect-url/${merchantTransactionId}`,
    redirectMode: "REDIRECT",
    mobileNumber: "9999999999",
    paymentInstrument: {
      type: "PAY_PAGE",
    },
  };

  //SHA256(base64 encoded payload + “/pg/v1/pay” + salt key) + ### + salt index
  const bufferObj = Buffer.from(JSON.stringify(payLoad), "utf8");
  const base64EncodedPayload = bufferObj.toString("base64");
  const xVerify =
    sha256(base64EncodedPayload + payEndPoint + SALT_KEY) + "###" + SALT_INDEX;

  const options = {
    method: "post",
    url: `${PHONE_PE_HOST_URL}${payEndPoint}`,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-VERIFY": xVerify,
    },
    data: {
      request: base64EncodedPayload,
    },
  };
  axios
    .request(options)
    .then((response) => {
      const payUrl = response.data.data.instrumentResponse.redirectInfo.url;
      res.redirect(payUrl);
    })
    .catch(function (error) {
      // res.send(error)
      console.error(error);
    });
});


// order Status page

router.get(
  "/redirect-url/:merchantTransactionId",
  wrapAsync(async (req, res) => {
    let { merchantTransactionId } = req.params;
    if (merchantTransactionId) {
      // SHA256(“/pg/v1/status/{merchantId}/{merchantTransactionId}” + saltKey) + “###” + saltIndex
      const xVerify =sha256(`/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}` + SALT_KEY ) + "###" + SALT_INDEX;
      const options = {
        method: "get",
        url: `${PHONE_PE_HOST_URL}/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}`,
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          "X-MERCHANT-ID" : merchantTransactionId,
          "X-VERIFY" : xVerify
        },
      };
      
      axios
        .request(options)
        .then(async function (response) {
          if(response.data.code == "PAYMENT_SUCCESS"){
            let p = await calculateTotalPrice(req.session.userId);
            if(p.calucalatedPrice != 10){
              let result = await calculateTotalPrice(req.session.userId, req.session.tableNo);
              let order = result.order
              order.payment.transactionId = response.data.data.transactionId;
              console.log(order);
              
              let orderSaveData = await order.save();
              await Customer.findOneAndUpdate({_id : req.session.userId}, { cart : [], $push: { orders: orderSaveData._id }})
              res.render("orderStatus.ejs", { transactionId : response.data.data.transactionId, code : "Payment Successfull" });
            }else{
              res.redirect("/menu")
            }
          }else{
            res.redirect("/menu")
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    } else {
      res.send({ error: "error" });
    }
  })
);


// calculate functions
async function calculateTotalPrice(id, tableNo) {

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

  if(tableNo){
    let order = new Order({
      items : cusData.cart,
      tableNo : Number(tableNo),
      amount : calucalatedPrice,
      customerId : id,
      payment : {
          paymentMode : "online",
          status : "paid",
      },
      date : new Date()
  })
  return {order};
  }else{
    return {calucalatedPrice : calucalatedPrice.totalPay }
  }
}


module.exports = router;
