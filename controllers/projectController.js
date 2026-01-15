// Import Product model
const Project = require("../models/Project");

/**
 * GET /products
 * Show all products
 */
module.exports.getAllProjects = async (req, res) => {
  try {
    //const products = await Product.find({});
    const projects = await Project.find({}).populate("owner", "username"); // ✅ FIXED
   // res.render("products/index", { products });
   //res.render("products/index", { products, currentUserId:req.user ||req.user._id });
  // res.render("products/index", { products, currentUserId: req.session.userId });
  res.render("projects/index", { projects, currentUserId: req.user ? req.user._id.toString() : null, currentUsername: req.user ? req.user.username : null});
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).send("Internal Server Error");
  }
};



/**
 * GET /products/new
 * Render form to create a new product
 */
module.exports.newProjectForm = (req, res) => {
  // res.render("projects/new");
  res.render("projects/new", {
    currentUserId: req.user ? req.user._id : null,
    currentUsername: req.user ? req.user.username : null   // <-- add this
  });
};

/**
 * POST /products
 * Create a new product
 */

module.exports.createProject = async (req, res) => {
  try {
     if (!req.user) {
      return res.status(401).send("Unauthorized: Please login first.");
    }
    // const { name, price, description, category } = req.body;
    const { title,description,techStack,githubLink,liveLink } = req.body;

    const images = req.files.map(file => ({
      // url: `/uploads/${file.filename}`,
      // filename: file.filename,

      url: file.path,
      filename: file.filename,
    }));

    const project = new Project({
      title,
      description,
      techStack,
      githubLink,
      liveLink,
      images,
      owner: req.user._id, // ✅ Associate with logged-in user
      //owner: req.session.userId,
    });

    await project.save();
    // res.redirect(`/products/${product._id}`);
    res.redirect('/projects');
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(400).send("❌ Failed to create product. Check all required fields.");
  }
};

/**
 * GET /products/:id
 * Show details of a single product
 */
module.exports.getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    //const product = await Product.findById(id);
    //const product = await Product.findById(id).populate("owner");
    const project = await Project.findById(req.params.id).populate("owner", "username");

    if (!project) return res.status(404).send("Product not found");

    //console.log(product); // Optional debug log
   // res.render("products/show", { product,currentUserId: req.user || req.session.user, });
   res.render("projects/show", { project, currentUserId: req.user?._id.toString() });

  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).send("Internal Server Error");
  }
};

/**
 * GET /products/:id/edit
 * Render edit form for a product
 */
module.exports.editProjectForm = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);

    if (!project) return res.status(404).send("Product not found");
    // if (!req.user || !product.owner.equals(req.session.userId)) {
    //      return res.status(403).send("⛔ Unauthorized: You cannot edit this product.");
    //   }
    // ✅ Check logged-in user owns the product
    if (!req.user || !project.owner || !project.owner.equals(req.user._id)) {
      return res.status(403).send("⛔ Unauthorized: You can't update this product.");
    }
    res.render("projects/edit", { project });
  } catch (err) {
    console.error("Error rendering edit form:", err);
    res.status(500).send("Internal Server Error");
  }
};

/**
 * PUT /products/:id
 * Update product details
 */

module.exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    // Find product
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).send("Product not found");
    }

    // // Check if current logged-in user is the owner
    // if (!product.owner ||!req.user ||!product.owner.equals(req.session.user._id)) {
    //   return res.status(403).send("⛔ Unauthorized: You can't update this product.");
    // }

     // ✅ Check logged-in user owns the product
    if (!req.user || !project.owner || !project.owner.equals(req.user._id)) {
      return res.status(403).send("⛔ Unauthorized: You can't update this product.");
    }
   
     // 🛠 Normalize link fields (prevent array-to-string casting errors)
    const normalizeToString = (value) => {
      if (Array.isArray(value)) {
        return value.find(v => typeof v === "string" && v.trim())?.trim() || "";
      }
      return typeof value === "string" ? value.trim() : "";
    };

    // Update fields safely
    project.title       = req.body.title?.trim() || project.title;
    project.description = req.body.description?.trim() || project.description;
    project.techStack   = req.body.techStack?.trim() || project.techStack;
    project.githubLink  = normalizeToString(req.body.githubLink);
    project.liveLink    = normalizeToString(req.body.liveLink);

    // // Update basic fields
    // project.title = req.body.title;
    // project.description = req.body.description;
    // project.techStack = req.body.techStack;
    // project.githubLink = req.body.githubLink;
    // project.liveLink = req.body.liveLink;

    // If new files are uploaded
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map((file) => ({
        // url: `/uploads/${file.filename}`,
        // filename: file.filename,

        url: file.path,
        filename: file.filename,
      }));

      // You can either replace all images OR add to existing ones
      project.images = newImages;
    }

    await project.save();

    res.redirect(`/projects/${project._id}`);
  } catch (err) {
    console.error("Update Product Error:", err);
    res.status(500).send("Server Error");
  }
};


/**
 * DELETE /products/:id
 * Delete a product
 */
module.exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).send("❌ Product not found");
    }

    // 🛡️ Authorization check: Only creator can delete
    // if (!product.owner.equals(req.session.userId)) {
    //   return res.status(403).send("⛔ Unauthorized: You cannot delete this product.");
    // }
    // ✅ Check logged-in user owns the product
    if (!req.user || !project.owner || !project.owner.equals(req.user._id)) {
      return res.status(403).send("⛔ Unauthorized: You can't update this product.");
    }
    await Project.findByIdAndDelete(id);
    res.redirect("/projects");
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).send("Internal Server Error");
  }
};
