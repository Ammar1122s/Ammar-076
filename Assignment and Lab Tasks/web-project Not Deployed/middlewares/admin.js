module.exports = function (req,res,next) {


    if(!req.session.user){
        req.setFlash("danger","You need to have Admin login to see this page!")
        res.redirect("/")
    }
    else if(!req.session.user.role.includes("admin")){
        req.setFlash("info","You need to have Admin login to see this page!")
        res.redirect("/")
    }
    else next();


 }