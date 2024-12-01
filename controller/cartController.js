const Customer = require("../models/customers.js");



module.exports.showCart = async (req, res) => {
  try {
    let id = req.session.userId;
    let data = await Customer.findById(id).populate("cart.itemId");
    // console.log(req.session.userId);

    let cusData = {
      id: data._id,
      name: data.name,
    };
    let cartItems = data.cart;
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
      calucalatedPrice.afterDiscount += Math.ceil(
        item.quantity *
          (item.itemId.price - item.itemId.price * (item.itemId.discount / 100))
      );
    }
    calucalatedPrice.sgst = Math.ceil(
      calucalatedPrice.afterDiscount * (2.5 / 100)
    );
    calucalatedPrice.cgst = Math.ceil(
      calucalatedPrice.afterDiscount * (2.5 / 100)
    );
    calucalatedPrice.totalPay = Math.ceil(
      calucalatedPrice.afterDiscount +
        calucalatedPrice.platformFee +
        calucalatedPrice.sgst +
        calucalatedPrice.cgst
    );
    res.render("cart.ejs", { cart: cartItems, cusData, calucalatedPrice });
  } catch (err) {
    console.log(err);
  }
};

module.exports.addItem = async (req, res) => {
  let item = {
    itemId: req.params.id,
  };
  let customer = await Customer.findOne(
    {
      _id: req.session.userId,
      "cart.itemId": req.params.id,
    },
    {
      "cart.$": 1,
    }
  );
  if (customer == null) {
    let result = await Customer.findOneAndUpdate(
      { _id: req.session.userId },
      { $push: { cart: item } }
    );
  } else {
    const cartItem = customer.cart[0];

    if (cartItem.quantity < 5) {
      const result = await Customer.updateOne(
        {
          _id: req.session.userId,
          "cart.itemId": req.params.id,
        },
        {
          $inc: { "cart.$.quantity": 1 },
        }
      );
    }
  }
  req.flash("success", "Item added successfully");
  res.redirect("/menu");
};

module.exports.decItem = async (req, res) => {
  let { cusId, itemId: itemIdToUpdate } = req.params;
  let customer = await Customer.findOne(
    {
      _id: cusId,
      "cart._id": itemIdToUpdate,
    },
    {
      "cart.$": 1,
    }
  );

  if (customer && customer.cart.length > 0) {
    const cartItem = customer.cart[0];

    if (cartItem.quantity > 1) {
      const result = await Customer.updateOne(
        {
          _id: cusId,
          "cart._id": itemIdToUpdate,
        },
        {
          $inc: { "cart.$.quantity": -1 },
        }
      );
    } else {
      await Customer.updateOne(
        {
          _id: cusId,
        },
        {
          $pull: { cart: { _id: itemIdToUpdate } },
        }
      );
    }
  }
  res.redirect("/cart");
};


module.exports.incItem = async (req, res) => {
    let { cusId, itemId: itemIdToUpdate } = req.params;
  
    let customer = await Customer.findOne(
      {
        _id: cusId,
        "cart._id": itemIdToUpdate,
      },
      {
        "cart.$": 1,
      }
    );
  
    if (customer && customer.cart.length > 0) {
      const cartItem = customer.cart[0];
  
      if (cartItem.quantity < 5) {
        const result = await Customer.updateOne(
          {
            _id: cusId,
            "cart._id": itemIdToUpdate,
          },
          {
            $inc: { "cart.$.quantity": 1 },
          }
        );
      }
    }
    res.redirect("/cart");
  }