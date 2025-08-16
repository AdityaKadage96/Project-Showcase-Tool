const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User"); // relative path to User.js

module.exports = function (passport) {
  passport.use(User.createStrategy()); // ✅ use built-in strategy

  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
};