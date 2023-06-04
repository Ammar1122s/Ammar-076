
module.exports = function (req,res,next) {

    res.locals.user = req.session.user;
    res.locals.flash = req.session.flash;
    console.log( res.locals.user);
    req.setFlash = function (type, message) {
        req.session.flash = { type, message };
      };
    req.session.flash = null
    next();
  }