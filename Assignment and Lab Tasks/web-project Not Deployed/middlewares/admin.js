module.exports = function (req,res,next) {

    if(!req.session.user.role.includes("admin")){
        req.setFlash("danger","You need to have Admin login to see this page!")
        res.redirect("/")
    }
    else next();


 }