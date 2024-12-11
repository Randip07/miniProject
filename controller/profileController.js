const Customer = require("../models/customers.js");
const Order = require("../models/orders.js");
const Rating = require("../models/ratings.js");

module.exports.showProfilePage = async (req, res) => {
  
  let data = await Customer.findById(req.session.userId)
    .populate("orders")
    .populate({
      path: "orders", // Populates items within each order
      populate: { path: "items.itemId" },
    });

  data.orders.sort((a, b) => new Date(b.date) - new Date(a.date));
  res.render("profile.ejs", { cusData: data });
};

module.exports.showRatingPage = async (req, res) => {
  let data = await Order.findById(req.params.id).populate("items.itemId");
  let ratingPageData = [];
  for (item of data.items) {
    ratingPageData.push({
      id: item.itemId._id,
      itemName: item.itemId.itemName,
    });
  }

  res.render("ratings.ejs", { ratingPageData, orderId: req.params.id });
};

module.exports.updateRating = async (req, res) => {
  let orderId = req.params.id;
  let itemData = await Order.findById(orderId).populate("items.itemId");

  let updateData = [];
  let rating = 0;
  for (item of itemData.items) {
    rating += Number(req.body.ratings[item.itemId._id]);
    updateData.push({
      updateOne: {
        filter: { itemId: item.itemId._id },
        update: { $push: { rating: req.body.ratings[item.itemId._id] } },
      },
    });
  }
  rating /= itemData.items.length;
  rating = Math.ceil(rating);

  let result = await Rating.bulkWrite(updateData);
  await Order.findByIdAndUpdate(orderId, {
    $set: {
      rating: {
        status: "done",
        rating: rating,
      },
    },
  });
  res.redirect("/profile");
};
module.exports.logOutUser = (req, res) => {
  // console.log("logout");

  // req.logout( (err) => {
  //   if(err){
  //     next(err);
  //   }
  //   req.flash("success", "you are logged out")
  //   res.redirect("/menu");
  // })

  req.session.destroy();
  res.redirect("/menu");
};
