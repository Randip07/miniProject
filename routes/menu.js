const express = require("express");
const router = express.Router();
const Menu = require("../models/menu.js");
const Customer = require("../models/customers.js");
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js");

const menuController = require("../controller/menuController.js");

// Rendering client side menu page
router.get("", wrapAsync(menuController.showClientMenu));

module.exports = router;
