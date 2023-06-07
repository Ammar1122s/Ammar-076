const express = require("express");
let server = express();

const Products = require("./model/FEATHER_PRODUCTS");

const New_pro = require("./model/NEW_PRODUCTS");

const PUBLISHABLE_KEY = "pk_test_51MIyjHCpjwMsS5vLUOihPRGjsFQc25t6hfDohyKpSnH5V0qTSmBbt5kWinkoHcWm1uArr7Q8zY7weg7Q1bLswfey00vDfLKpl2"

const SECRET_KEY = "sk_test_51MIyjHCpjwMsS5vLVQNnsjUYz3f2x4IYK6piN3NuUBM8kmb80DcpB9R4R8vkBOwYSsuLBLDApXvvZI2qzU7JB1cD007OqpDSIU"

var cookieParser = require("cookie-parser");
var session = require("express-session");

require("dotenv").config()


const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

// var stripe = require("stripe");

// server.use(stripe);

server.use(express.static("public"));

server.use(express.urlencoded());
server.use(express.json());
server.use(cookieParser());
server.use(
  session({
    secret: "heheh Secret",
    cookie: { maxAge: 1000000000, },
    resave: true,
    saveUninitialized: true,
  })
);

server.use(require("./middlewares/checkSession"))
let sessionAuth1 = require("./middlewares/sessionAuth")
server.use(require("./middlewares/nav"))

var expressLayouts = require("express-ejs-layouts");
server.use(expressLayouts)
server.use("/", require("./route/api/feather_products"));

server.use("/",require("./route/auth"))

server.use("/",require("./route/athentication"))

server.use("/",require("./route/pro_handler"))

server.use("/",require("./route/cart"))

server.set("view engine", "ejs");


server.get("/shop",async(req,res)=>{
  req.setNav("shop");
  let record = await Products.find();
  let new_pro = await New_pro.find();
  let records = record.concat(new_pro);

  const productsPerPage = 8;
  const totalPages = Math.ceil(records.length / productsPerPage);
  const currentPage = parseInt(req.query.page) || 1;
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  const paginatedArray = records.slice(startIndex, endIndex);

  res.render('shop', { record: paginatedArray, currentPage , productsPerPage,totalPages });
})
server.get("/login",(req,res)=>{
  req.setNav("login");
  res.render("login.ejs")
})
server.get("/signup",(req,res)=>{
  req.setNav("signup");
  res.render("signup.ejs")
})

server.get("/blog", sessionAuth1 ,(req,res)=>{
  req.setNav("blog");
  res.render("blog")
})


server.get("/cart", (req,res)=>{
  req.setNav("cart");
  res.render("cart")
})



server.listen(3000, () => {
  console.log("Server Started, Visit localhost:3000");
});

const mongoose = require("mongoose");
const sessionAuth = require("./middlewares/sessionAuth");
const { default: Stripe } = require("stripe");
mongoose
  .connect("mongodb://localhost/Ecommerce-Sit", { useNewUrlParser: true })
  .then(() => console.log("Connected to Mongo ...."))
  .catch((error) => console.log(error.message));


