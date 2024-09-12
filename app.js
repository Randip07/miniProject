const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Employee = require("./models/employee.js");
const Menu = require("./models/menu.js");
const Customer = require("./models/customers.js");
const Table = require("./models/table.js");
const Order = require("./models/orders.js");
const methodOverride = require('method-override')

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride('_method'))

const port = 8080;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

main()
  .then((res) => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/restaurent");
}

app.get("/", (req, res) => {
  res.redirect("/home");
});

app.get("/home", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/booking", (req, res) => {
  res.render("booking.ejs");
});

app.get("/menu", async (req, res) => {
  let data = await Menu.find({});
  res.render("menu.ejs", { items: data });
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard.ejs");
});

app.get("/dashboard/orders", async (req, res) => {
  // let data = await Order.findOne({orderId : 1001}).populate("items")
  // console.log(data);
  res.render("orders.ejs");
});

app.get("/dashboard/customers", async (req, res) => {
  let data = await Customer.find({});
  res.render("customer.ejs", { customers: data });
});

app.get("/dashboard/employee", async (req, res) => {
  let data = await Employee.find({});
  res.render("employees.ejs", { employees: data });
});

app.get("/dashboard/employee/new", async (req, res) => {
    res.render("newEmp.ejs");
});

app.post("/dashboard/employee", async (req, res) => {
    let employeeId = await Employee.countDocuments();
    employeeId += 10100;
    
    let newEmployee = new Employee({
        employeeId : employeeId,
        name : req.body.name,
        age : req.body.age,
        location : {
            city : req.body.city
        },
        contactNo : "91" + req.body.contactNo,
        gender : req.body.gender,
        salary :  req.body.salary,
        post :  req.body.post,
        joiningDate :  new Date(),
    })

    await newEmployee.save();
    res.redirect("/dashboard/employee");
});

app.get("/dashboard/employee/:id/edit", async (req, res) => {
    let { id } = req.params
    let empData = await Employee.findById(id)
    res.render("editEmp.ejs" , { data : empData });
});

app.put("/dashboard/employee/:id", async (req, res) => {
    let { id } = req.params
    let newData = {
        name : req.body.name,
        age : req.body.age,
        location : {
            city : req.body.city
        },
        contactNo : "91" + req.body.contactNo,
        gender : req.body.gender,
        salary :  req.body.salary,
        post :  req.body.post,
    }
    // console.log(newData);
    let empData = await Employee.findByIdAndUpdate(id, newData)
    // console.log(empData);
    res.redirect("/dashboard/employee");
});

app.get("/ratings", (req, res) => {
  res.render("ratings.ejs");
});

app.get("/dashboard/menu", async (req, res) => {
  let data = await Menu.find({});
  let category = [
    "Appetizers",
    "Main-Course",
    "Beverages",
    "Ice-Cream",
    "Drinks",
    "Add-On",
  ];
  res.render("dashMenu.ejs", { items: data , categories : category});
});

app.get("/dashboard/menu/new", (req, res) => {
  res.render("newItem.ejs")
});

app.get("/dashboard/menu/:id/edit", async (req, res) => {
    let { id } = req.params
    let itemData = await Menu.findById(id)
    res.render("editItem.ejs" , { data : itemData });
});

app.put("/dashboard/menu/:id", async (req, res) => {
    let { id } = req.params
    let newData = req.body;
    await Menu.findByIdAndUpdate(id, newData)
    res.redirect("/dashboard/menu");
});

app.post("/dashboard/menu", async (req, res) => {
  let itemID = await  Menu.countDocuments();
  itemID += 11101;
  
  let newMenu = new Menu({
      itemID :  itemID,
      itemName : req.body.itemName,
      itemDetails : req.body.itemDetails,
      price : req.body.price,
      category :  req.body.category,
      discount : req.body.discount,
      availablity : req.body.availablity,
      type : req.body.type,
  })

  await newMenu.save();
  res.redirect("/dashboard/menu");
});

//Dashboard Table
app.get("/dashboard/table", async (req,res) => {
    let data = await Table.find();
    res.render("dashTable.ejs", {tables : data})
})

app.get("/dashboard/table/view/:id", async (req,res) => {
    let { id } = req.params
    let data = await Table.findById(id)
    res.render("dashTableView.ejs", {data})
})

app.get("/cart", async (req, res)=> {
  let data = await Customer.findById("66e1cbc286cde24d097b1c08").populate("cart.itemId")
  let cusData = {
    id : data._id,
    name : data.name
  }
  res.render("cart.ejs", { cart : data.cart, cusData})
})

app.post("/cart/:id", async (req, res)=> {
  let item = {
    itemId : req.params.id
  };
  let customer = await Customer.findOne(
    {
      _id: "66e1cbc286cde24d097b1c08",
      "cart.itemId": req.params.id 
    },
    {
      "cart.$": 1 
    }
  );
  if(customer == null){
    let result = await Customer.findOneAndUpdate({_id : "66e1cbc286cde24d097b1c08"}, {$push : { cart : item}})
  }else{
    const cartItem = customer.cart[0];
    
    if (cartItem.quantity < 5) {
      const result = await Customer.updateOne(
        {
          _id: "66e1cbc286cde24d097b1c08",
          "cart.itemId": req.params.id
        },
        {
          $inc: { "cart.$.quantity": 1 }
        }
      )
    }
  }
  res.redirect("/menu")
})

app.put("/cart/s/:cusId/:itemId", async (req, res) => {
  let { cusId, itemId : itemIdToUpdate} = req.params;
  let customer = await Customer.findOne(
    {
      _id: cusId,
      "cart._id": itemIdToUpdate 
    },
    {
      "cart.$": 1 
    });

  if (customer && customer.cart.length > 0) {
    const cartItem = customer.cart[0];
    
    if (cartItem.quantity > 1) {
      const result = await Customer.updateOne(
        {
          _id: cusId,
          "cart._id": itemIdToUpdate
        },
        {
          $inc: { "cart.$.quantity": -1 }
        }
      )
    }else{
      await Customer.updateOne(
        {
          _id: cusId
        },
        {
          $pull: { cart: { _id: itemIdToUpdate } } 
        }
      )
    }
  };

  res.redirect("/cart")
})

app.put("/cart/p/:cusId/:itemId", async (req, res) => {
  let { cusId, itemId :itemIdToUpdate} = req.params;

  let customer = await Customer.findOne(
    {
      _id: cusId,
      "cart._id": itemIdToUpdate 
    },
    {
      "cart.$": 1 
    });

  if (customer && customer.cart.length > 0) {
    const cartItem = customer.cart[0];
    
    if (cartItem.quantity < 5) {
      const result = await Customer.updateOne(
        {
          _id: cusId,
          "cart._id": itemIdToUpdate
        },
        {
          $inc: { "cart.$.quantity": 1 }
        }
      )
    }};
  res.redirect("/cart")
})