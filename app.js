if (process.env.NODE_ENV !== "production") {
  require("dotenv").config(); // Load .env values into process.env
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const MongoStore = require("connect-mongo");
const path = require("path");
const setUser = require('./middleware/setUser');
// ⬇️ Models and Routes
const User = require("./models/User"); 
const projectRoutes = require("./routes/projectRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
// ⬇️ Passport-related imports
const passport = require("passport");
const LocalStrategy = require("passport-local");

// ✅ MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/productCatalog")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// ✅ Express & Middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// ✅ Session setup using MongoDB as session store
const sessionOptions = {
  secret: "supersecret", // Use process.env.SESSION_SECRET in production
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: "mongodb://127.0.0.1:27017/Projec-Showcase-Tool",
    collectionName: "sessions"
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
};
app.use(session(sessionOptions));
 

// ✅ Flash middleware
app.use(flash());

// Passport config (load strategy setup)
require("./config/passportConfig")(passport); 

// ✅ 🔑 Passport initialization (PLACE THIS HERE)
app.use(passport.initialize());
app.use(passport.session());
//passport.use(new LocalStrategy(User.authenticate()));
// Automatically uses the correct strategy
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ✅ Make session & flash messages available in all views
app.use((req, res, next) => {
  res.locals.session = req.session;
  //res.locals.currentUser = req.user;
  //res.locals.currentUserId = req.session.userId;
  res.locals.currentUserId = req.user ? req.user._id.toString() : null;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// ✅ Routes
app.use(setUser);

app.use("/", userRoutes);
app.use("/auth", authRoutes);
app.use("/projects", projectRoutes);
//app.use("/auth", authRoutes); // Login, Register, Logout

// ✅ Home Route
app.get("/", (req, res) => {
  res.redirect("/projects");
});

// ✅ Start the Server
app.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});
