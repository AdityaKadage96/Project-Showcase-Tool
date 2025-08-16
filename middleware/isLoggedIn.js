module.exports = function isLoggedIn(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "You must be logged in");
  res.redirect("/login");
};

