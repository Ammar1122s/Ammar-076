const express = require("express");
let router = express.Router();

const Products = require("../model/FEATHER_PRODUCTS");

const New_pro = require("../model/NEW_PRODUCTS");


router.get("/product/single/:id", async (req,res) =>{

    let final ;
    if (req.params.id == "navigation.js" || req.params.id == "login.js") {
        res.redirect("back");
    }
    else{
        let pro = await Products.findById(req.params.id);
        let n_pro;
        if(!pro){
        n_pro = await New_pro.findById(req.params.id);
        final = n_pro;   
        }
        else{
            final = pro;
        }
        res.render("single-pro",{product:final});
    }
   
    
})





module.exports = router;