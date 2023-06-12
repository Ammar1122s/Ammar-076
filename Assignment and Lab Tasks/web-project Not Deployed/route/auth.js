const express = require("express");
const bcrypt = require("bcryptjs");
let router = express.Router();
let User = require("../model/USER");
const sessionAuth = require("../middlewares/sessionAuth");

const gmailCheck = require("../middlewares/gmailCheck")


const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: "757446044695-e4pbt0ag9gkg7le75rodk69vohfiek9q",
      clientSecret: "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",
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
       return done(null, profile);
    
    }
  )
);

router.post("/login", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    req.setFlash("danger", "User with this email not present");
    return res.redirect("/login");
  }
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (validPassword) {
    req.session.user = user;
    if(user.role.includes("admin")){
      req.setFlash("success", "Admin login Successfully");
    }
    else{
    req.setFlash("success", "Logged in Successfully");
    }
    return res.redirect("/");
  } else {
    req.setFlash("danger", "Invalid Password");
    return res.redirect("/login");
  }
});


router.post("/signup",async(req,res) =>{

  let userObj = req.body;
  let all_users = await User.findOne({email:userObj.email});

    if (all_users) {
      req.setFlash("danger","Email is already taken!")
      res.redirect("/signup");
    }


  else if(userObj.name.length == 0){
    req.setFlash("danger","Please enter the Name!")
    res.redirect("/signup");
  }
  else if(userObj.password.length < 6){
    req.setFlash("danger","Password must be more than 6 characters")
    res.redirect("/signup");
  }
  else{
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(userObj.password, salt);
  userObj.password = hashed;
  let user = new User(userObj);
  await user.save();
  req.setFlash("info","Please login to Continue!")
  res.redirect("/login");
  }

})

router.post("/edit",async (req,res) =>{
  console.log(req.body)
  res.redirect("profile")
})

router.get("/logout", sessionAuth,(req,res) =>{
  req.setFlash("info","Sucessfully Logout")
  req.session.user = null;
  res.redirect("/login") 
})



router.get("/profile", sessionAuth,(req,res) =>{
  
  res.render("profile")
})

router.get("/profile-edit",gmailCheck, (req, res) =>{
  res.render("profile-edit")
})

router.get("/delete-profile/:id",gmailCheck,  async (req, res) =>{

  let done = await  User.findByIdAndDelete(req.params.id)
  req.session.user = null;
  res.redirect("/")
})


router.post("/profile-edit1/:id", async (req,res) =>{

  let userObj = req.body;
  if(userObj.name.length == 0){
    req.setFlash("danger","Please enter the Name!")
    res.redirect("/profile-edit");
  }
  else if(userObj.password.length < 6){
    req.setFlash("danger","Password must be more than 6 characters")
    res.redirect("/profile-edit");
  }
  else{
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(userObj.password, salt);
  userObj.password = hashed;


  let user = await User.findByIdAndUpdate(req.params.id,userObj,{
    new:true
  });
  req.session.user= user;
  req.setFlash("info","Use info Updated!")
  res.redirect("/profile");
  }

})



router.get("/auth/google",passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {

let userObj={
  _id:req.user.id,
  name:req.user.displayName,
  email:req.user.emails[0].value,
  role:["user","gmailLogin"]
}
req.session.user = userObj;
req.setFlash("success", "Gmail Login Successfully");

console.log(userObj)

  res.redirect("http://localhost:3000");
});

module.exports = router;