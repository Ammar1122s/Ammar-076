module.exports = function (req,res,next)  {
    if(!req.session.user){
        req.setFlash("danger","You need to Login to see this page!")
        res.redirect("/login")
    }
    else next();
}