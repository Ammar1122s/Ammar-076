
module.exports = function (req,res,next) {

    res.locals.user = req.session.user;
    res.locals.flash = req.session.flash;
    req.setFlash = function (type, message) {
        req.session.flash = { type, message };
      };
    req.session.flash = null
    next();
  }