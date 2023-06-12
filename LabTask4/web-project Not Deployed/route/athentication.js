const express = require("express");
let router = express.Router();
let User = require("../model/USER");

let adminCheck = require("../middlewares/admin")

router.get("/admin", adminCheck, async (req,res) =>{

    let users = await User.find();
    res.render("admin-panel",{users:users})
})


router.get("/admin/remove/:id", adminCheck, async (req,res) =>{

    let users = await User.findByIdAndDelete(req.params.id);
    res.redirect("back")
})



module.exports = router;