const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
    },

    phone: {
      type: String,
    },

    subject: {
      type: String,
      default: "Contact Form Message",
    },

    message: {
      type: String,
      required: true,
      minlength: 10,
    },

    // Optional read status (useful later for admin panel)
    isRead: {
      type: Boolean,
      default: false, // optional because it's not required
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", ChatSchema);
