const express = require("express");

const Products = require("../../model/Product");

const router = express.Router();


router.get("/api/products", async function (req, res) {
    let record = await Products.find();
    res.send(record);
  });


  
module.exports = router;