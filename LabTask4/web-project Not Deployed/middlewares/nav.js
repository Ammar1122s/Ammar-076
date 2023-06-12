module.exports= function (req,res,next) {
  res.locals.nav = req.session.nav
    req.setNav = function(value){
      res.locals.nav = value;
    }
    next();
  }