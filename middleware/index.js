var middlewareObj = {};
middlewareObj.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("./views/index.ejs"); //if not logged in, go to index page
};
module.exports = middlewareObj;
