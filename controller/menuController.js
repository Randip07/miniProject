const Menu = require("../models/menu.js");
const Customer = require("../models/customers.js");
const Charge = require("../models/charges.js");

module.exports.showClientMenu = async (req, res, next) => {
  let data = await Menu.find({}).populate("rating").sort({ itemName: 1 });
  let cartcount = await Customer.findOne({ _id: req.session.userId });
  let count;
  if (!cartcount) {
    count = 0;
  } else {
    count = cartcount.cart.length;
  }
  let categories = ["Appetizers", "Main-Course", "Beverages", "Ice-Cream", "Drinks", "Add-On"];
  let discount = await Charge.findOne();
  discount = discount.discount
  res.render("menu.ejs", { items: data, count, categories , discount});
};
