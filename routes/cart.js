const express = require("express");
const router = express.Router();
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn } = require("../middlewares.js");
const cartController = require("../controller/cartController.js");

// Cart Page
router.get("", isLoggedIn, wrapAsync(cartController.showCart));

// Adding Item in the cart
router.post("/:id", isLoggedIn, wrapAsync(cartController.addItem));

// Decrease Quantity of item In the Cart
router.put("/s/:cusId/:itemId", wrapAsync(cartController.decItem));

// Increase Quantity of item In the Cart
router.put("/p/:cusId/:itemId", wrapAsync(cartController.incItem));

module.exports = router;
