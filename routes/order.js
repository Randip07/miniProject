const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { now } = require("mongoose");

const orderController = require("../controller/orderController.js");

// orderStatus page

// ordering item
router.post("", wrapAsync(orderController.orderingItem));

// Order Cancel
router.delete("/cancel/:id", wrapAsync(orderController.orderCancel));

module.exports = router;
