const express = require("express");

let router = express.Router();

const Products1 = require("../model/FEATHER_PRODUCTS");

const New_pro1 = require("../model/NEW_PRODUCTS");

router.get("/cart", async(req,res)=>{
  req.setNav("cart");
  let cart = req.cookies["cart"];
  if (!cart) cart = [];
  let pro = await Products1.find({ _id: { $in: cart } });
  let pro1 = await New_pro1.find({ _id: { $in: cart } });
  const cart_pro = [...pro, ...pro1];
  let total = 0;
  for (let index = 0; index < cart_pro.length; index++) {
    total += cart_pro[index].price;
  }
  return res.render("cart", { cart_pro, total });

  })

router.get("/cart/add-to-cart/:id", (req,res)=>{
    let cart = req.cookies["cart"];
    if (!cart) cart = [];
    cart.push(req.params.id);
    res.cookie("cart", cart);
    req.setFlash("info", "Item is added into the Cart!");
    return res.redirect("back");
  })
  router.get("/deals/remove-from-cart/:id", (req, res) => {
    let cart = req.cookies["cart"];
    if (!cart) cart = [];
    let index = cart.find((c) => c == req.params.id);
    cart.splice(index, 1);
  
    res.cookie("cart", cart);
    return res.redirect("back");
  });



module.exports = router;