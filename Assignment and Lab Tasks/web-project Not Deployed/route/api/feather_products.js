const express = require("express");

const Products = require("../../model/FEATHER_PRODUCTS");

const New_pro = require("../../model/NEW_PRODUCTS");

const router = express.Router();


router.get("/", async function (req, res) {
    let record = await Products.find();
    let new_pro = await New_pro.find();
    req.setNav("home");
    //console.log(record)
    res.render("home1",{record:record,new_pro:new_pro});
  });

  router.delete("/api/products/:id", async function (req, res) {
    let record = await Products.findByIdAndDelete(req.params.id);
    res.send(record);
  });
  
module.exports = router;