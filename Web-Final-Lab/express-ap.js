const express = require("express");
let server = express();

const recepies = require("./model/Recepie"); 


server.use(express.static("public"));

server.use(express.urlencoded());
server.use(express.json());

var expressLayouts = require("express-ejs-layouts");
server.use(expressLayouts)


server.set("view engine", "ejs");

server.get("/",async(req,res)=>{

  let rece = await recepies.find();

  res.render("main",{recepies:rece})
})
server.get("/remove/:id",async(req,res)=>{

  const id = req.params.id
  let rece = await recepies.findByIdAndDelete(req.params.id);
  
  return res.redirect("back");
})

server.get("/add",async(req,res)=>{

  res.render("add-items")
})


server.post("/add",async(req,res)=>{
  let obj = req.body
  let rece = new recepies(obj);
  await rece.save();

  res.redirect("/")  

})


server.listen(3000, () => {
  console.log("Server Started, Visit localhost:3000");
});

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/Ecommerce-Sit", { useNewUrlParser: true })
  .then(() => console.log("Connected to Mongo ...."))
  .catch((error) => console.log(error.message));


