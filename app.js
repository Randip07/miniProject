const express = require("express");
const app = express();
const path = require("path")

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

const port = 8080;

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})

app.get("/", (req, res) => {
    res.redirect("/home")
})

app.get("/home", (req, res) => {
    res.render("home.ejs")
})

app.get("/login", (req, res) => {
    res.render("login.ejs")
})

app.get("/booking", (req, res) => {
    res.render("booking.ejs")
});

app.get("/menu", (req, res) => {
    res.render("menu.ejs")
});

app.get("/dashboard", (req, res) => {
    res.render("dashboard.ejs")
});

app.get("/dashboard/orders", (req, res) => {
    res.render("orders.ejs")
});

app.get("/dashboard/customers", (req, res) => {
    res.render("customer.ejs")
})

app.get("/ratings", (req, res) => {
    res.render("ratings.ejs")
});