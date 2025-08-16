const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const upload = require("../middleware/upload");
const projectController = require("../controllers/projectController");
const { isLoggedIn, isOwner } = require("../middleware/authMiddleware"); // ✅ Destructured both

// Enable PUT & DELETE in forms via ?_method
router.use(methodOverride("_method"));

// ✅ Validate MongoDB ID middleware
function validateObjectId(req, res, next) {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("❌ Invalid MongoDB ID");
  }
  next();
}

// ✅ Public Routes
router.get("/", projectController.getAllProjects); // Anyone can view all products
// ✅ New route must come before /:id
router.get("/new", isLoggedIn, projectController.newProjectForm); // FIXED

router.get("/:id", validateObjectId, projectController.getProjectById); // Anyone can view single product

// ✅ Protected Routes (logged in)
// router.get("/new", isLoggedIn, productController.newProductForm); // New product form
router.post("/", isLoggedIn, upload.array("images", 5), projectController.createProject); // Create

// ✅ Owner-Protected Routes
router.get("/:id/edit", isLoggedIn, validateObjectId, isOwner, projectController.editProjectForm); // Edit form
router.put("/:id", isLoggedIn, validateObjectId, isOwner, upload.array("images", 5), projectController.updateProject); // Update
router.delete("/:id", isLoggedIn, validateObjectId, isOwner, projectController.deleteProject); // Delete

module.exports = router;
