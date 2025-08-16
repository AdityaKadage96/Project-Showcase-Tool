const User = require("../models/User");
const passport = require("passport");

// Show login form
module.exports.renderLoginForm = (req, res) => {
  res.render("auth/login"); // views/auth/login.ejs
};

// Handle login
// Update this in authController.js
module.exports.loginUser = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      req.flash("error", "Invalid credentials");
      return res.redirect("/login");
    }

    req.logIn(user, (err) => {
      if (err) return next(err);

      // ✅ Manually store user ID in session
      req.session.userId = user._id;
      console.log("Session set: ", req.session.userId);

      return res.redirect("/projects");
    });
  })(req, res, next);
};


// Show register form
module.exports.renderRegisterForm = (req, res) => {
  res.render("auth/register"); // views/auth/register.ejs
};

// Handle user registration
module.exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = new User({ username, email });

    await User.register(user, password);

    req.login(user, (err) => {
      if (err) {
        console.log("Login after registration failed", err);
        return res.redirect("/login");
      }

      // ✅ Save userId in session
       req.session.userId = user._id;
      return res.redirect("/projects"); // Or your homepage
    });
    
  } catch (err) {
    console.error("Registration error:", err);
    
    let errorMessage = "Something went wrong during registration.";

    if (err.name === "UserExistsError") {
      errorMessage = "⚠️ Username is already taken. Try a different one.";
    }

    res.render("auth/register", {
      error: errorMessage,
      username,
      email,
    });
  }
};

// Logout
module.exports.logoutUser = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log("Logout error:", err);
      return res.redirect("/projects");
    }
    res.redirect("/auth/login");
  });
};
