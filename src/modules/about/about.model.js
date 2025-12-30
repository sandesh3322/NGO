const mongoose = require("mongoose");

const AboutUsSchema = new mongoose.Schema({
  title: {          // Example: "About Us"
    type: String,
    required: true,
  },
  shortDescription: {  // A brief intro text
    type: String,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
  vision: {
    type: String,
    required: true,
  },
  history: {
    type: String,
    required: false,   // Optional if not needed
  },
  chairmanMessage: {
    name: { type: String, required: true },  // e.g., "Mr. ABC"
    message: { type: String, required: true },
    imageUrl: { type: String },               // Optional photo
  },
  images: [String],   // Array of image URLs (for gallery or about section visuals)
});

module.exports = mongoose.model("AboutUs", AboutUsSchema);
