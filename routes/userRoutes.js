const express = require("express");
const router = express.Router();
const { getMyProfile, getPublicProfile } = require("../controllers/userController");

function isLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  next();
}

router.get("/profile", isLoggedIn, getMyProfile);


// Public profile route
router.get("/users/:id", getPublicProfile);


module.exports = router;
