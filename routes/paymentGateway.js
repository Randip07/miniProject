const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const paymentGatewayController = require("../controller/paymentGatewayController.js");

// initiate Payment
router.post("/initiate_payment", wrapAsync(paymentGatewayController.initiatePayment));

// Payment Check
router.get("/redirect-url/:merchantTransactionId", wrapAsync(paymentGatewayController.paymentCheck));

module.exports = router;
