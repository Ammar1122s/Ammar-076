const express = require("express");
const bcrypt = require("bcryptjs");
let router = express.Router();
let User = require("../model/USER");

router.post("/login", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    req.setFlash("danger", "User with this email not present");
    return res.redirect("/login");
  }
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (validPassword) {
    req.session.user = user;
    req.setFlash("success", "Logged in Successfully");
    return res.redirect("/");
  } else {
    req.setFlash("danger", "Invalid Password");
    return res.redirect("/login");
  }
});

router.post("/signup",async(req,res) =>{

  let userObj = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(userObj.password, salt);
  userObj.password = hashed;
  let user = new User(userObj);
  await user.save();
  res.redirect("/login");
})

router.get("/logout",(req,res) =>{
  req.setFlash("info","Sucessfully Logout")
  req.session.user = null;
  res.redirect("/login")
})


router.get("/profile",(req,res) =>{
  
  res.send( req.session.user)
})


module.exports = router;