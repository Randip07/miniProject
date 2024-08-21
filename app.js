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

app.get("/home", (req, res) => {
    res.render("home.ejs")
})

app.get("/login", (req, res) => {
    res.render("login.ejs")
})

app.get("/menu", (req, res) => {
    res.render("menu.ejs");
})