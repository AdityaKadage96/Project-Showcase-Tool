// middleware/authMiddleware.js
const Project = require("../models/Project");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send("You must be logged in.");
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  // const Product = require("../models/Product");
  const { id } = req.params;

  try {
    const project = await Project.findById(id).populate("owner");

    if (!project) {
      return res.status(404).send("Product not found");
    }

    if (!project.owner || !req.user || project.owner._id.toString() !== req.user._id.toString()) {
      return res.status(403).send("You are not authorized to modify this product");
    }

    next();
  } catch (err) {
    console.error("Authorization Error:", err);
    res.status(500).send("Server Error");
  }
};
