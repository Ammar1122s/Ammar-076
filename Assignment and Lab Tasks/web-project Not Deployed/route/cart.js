const express = require("express");

let router = express.Router();

let sessionAuth = require("../middlewares/sessionAuth");

const Products1 = require("../model/FEATHER_PRODUCTS");

const New_pro1 = require("../model/NEW_PRODUCTS");

const ORDER = require("../model/ORDER");
const { Connection } = require("mongoose");

require("dotenv").config()


const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

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

  router.get("/deals/order/:id/:name", async(req, res) => {

    let pro = await New_pro1.findById(req.params.id);
    let final;

    if(!pro){
      let pro2 = await Products1.findById(req.params.id)
      final = pro2;
    }
    else{
      final= pro;
    }
    let orderObj = {
      name:final.name,
      product_id:req.params.id,
      price:final.price,
      path:final.path,
      orderfor:req.params.name
    }

    let order = new ORDER(orderObj);
    await order.save();
    req.setFlash("info","Your Order has been Placed!")

    let cart = req.cookies["cart"];
    let index = cart.find((c) => c == req.params.id);
    cart.splice(index, 1);
  
    res.cookie("cart", cart);

    return res.redirect("back");
  });

  



  router.get("/deals/ordering/:id",  async (req, res) => {

    console.log(req.params.id)
    let final;
    try{
    let pro = await New_pro1.findById(req.params.id);
   

    if(!pro){
      let pro2 = await Products1.findById(req.params.id)
      final = pro2;
    }
    else{
      final= pro;
    }
  }
  catch(e){
    console.log(e)
  }
    const obj = [ {
      price_data: {
        currency: "usd",
        product_data: {
          name: final.name,
        },
        unit_amount: final.price,
      },
      quantity: 1,

    } ]
    console.log(obj)

    let ok;

    try{
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items:obj.map(o => {
        return o;
      }
        ),
      success_url: `http://localhost:3000/deals/order/${req.params.id}/Ammar`,
      cancel_url:`http://localhost:3000/cart`
    })
   ok = session.url;
  }
  catch(e){
    console.log(e)
  }
   

    res.redirect(ok)

  })

  router.get("/deals/ordering", sessionAuth, async (req, res) => {
    res.redirect(cart);

  })



module.exports = router;