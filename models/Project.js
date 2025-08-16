// const mongoose = require("mongoose");
// const productSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   price: { type: Number, required: true },
//   description: { type: String, required: true },
//   category: { type: String },
//   images: [
//     {
//       url: String,
//       filename: String,
//     },
//   ],
//   owner: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User", // this refers to the User model
//     required: true
//   },
// });


// module.exports = mongoose.model("Product", productSchema);

//--------------------------------------Project Schema-------------------------
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  techStack: {
    type: [String], // array of technologies
    required: true
  },
  githubLink: {
    type: String
  },
  liveLink: {
    type: String
  },
  images: [
    {
      url: String,
      filename: String,
    },
  ],
  // image: {
  //   type: String // will store image URL or path
  // },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // linking to the user who created the project
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
