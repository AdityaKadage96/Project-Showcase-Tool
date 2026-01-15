const Project = require("../models/Project");
const User = require("../models/User");


module.exports.getMyProfile = async (req, res) => {
  try {
    const user = req.user;
    const projects = await Project.find({ owner: user._id });
     res.render("users/myProfile", { user, projects });
  //   
  // if (!req.user) {
  //   return res.redirect("/auth/login");
  // }

  // res.render("users/myProfile", {
  //   user: req.user,                // ✅ pass logged-in user
  //   currentUsername: req.user.username // also pass username for header.ejs
  // });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};


module.exports.getPublicProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Find products created by the user
    const projects = await Project.find({ owner: userId });

    res.render("users/userProfile", { user, projects });
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
};