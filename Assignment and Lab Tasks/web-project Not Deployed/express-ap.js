const express = require("express");
let server = express();

const Products = require("./model/FEATHER_PRODUCTS");

const New_pro = require("./model/NEW_PRODUCTS");


server.use(express.static("public"));

server.use(express.json());

var expressLayouts = require("express-ejs-layouts");
server.use(expressLayouts)
server.use("/", require("./route/api/feather_products"));

server.set("view engine", "ejs");

// server.get("/",(req, res) => {
//   res.render("home1.ejs");
// })

server.get("/shop",async(req,res)=>{
  let record = await Products.find();
  let new_pro = await New_pro.find();
  res.render("shop.ejs",{record:record,new_pro:new_pro})
})
server.get("/login",(req,res)=>{
  res.render("login.ejs")
})
server.get("/signup",(req,res)=>{
  res.render("signup.ejs")
})

server.listen(3000, () => {
  console.log("Server Started, Visit localhost:3000");
});

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/Ecommerce-Sit", { useNewUrlParser: true })
  .then(() => console.log("Connected to Mongo ...."))
  .catch((error) => console.log(error.message));