const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Show login form
router.get("/login", authController.renderLoginForm);

// Handle login logic
router.post("/login", authController.loginUser);

// Show register form
router.get("/register", authController.renderRegisterForm);

// routes/authRoutes.js
//router.get("/register", authController.showRegisterForm);


// Handle registration logic
router.post("/register", authController.registerUser);

// Handle logout
router.get("/logout", authController.logoutUser);

module.exports = router;

