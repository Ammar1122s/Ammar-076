module.exports = function (req,res,next) {


   
 if(req.session.user.role.includes("gmailLogin")){
        req.setFlash("info","You can perform this task with Google Account!")
        res.redirect("/")
    }
    else next();


 }