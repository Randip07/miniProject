const express = require("express");
const app = express();
const path = require("path")

app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")))

const port = 8080;

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})

app.get("/home", (req, res) => {
    res.render("index.ejs")
})