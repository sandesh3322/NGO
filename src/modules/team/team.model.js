const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
  name: {                 // Example: "Sandesh Poudel"
    type: String,
    required: true,
    trim: true,
  },
  position: {             // Example: "Frontend Developer"
    type: String,
    required: true,
    trim: true,
  },
  profileImage: {         // Single profile image URL
    type: String,
    required: true,
  },
  rank: {                 // Display order (lower = higher priority)
    type: Number,
    required: true,
    index: true,
  },
  status:{ 
        type: String ,
        enum: ["active", "inactive"],
        default: "inactive"
        
    },
}, {
  timestamps: true
});

module.exports = mongoose.model("Team", TeamSchema);
