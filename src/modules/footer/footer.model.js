const mongoose = require("mongoose");

const FooterSchema = new mongoose.Schema({
    aboutText: {
        type: String,
        default: "",
    },
    contact: {
        phone: { type: String, default: "" },
        email: { type: String, default: "" },
        address: { type: String, default: "" }
    },
    socialLinks: {
        facebook: { type: String, default: "" },
        twitter: { type: String, default: "" },
        instagram: { type: String, default: "" },
        linkedin: { type: String, default: "" }
    },
    quickLinks: [
        {
            title: { type: String, required: true },
            url: { type: String, required: true }
        }
    ],
    copyrightText: {
        type: String,
        default: "© 2025 Your Company. All rights reserved."
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AdminUser",
        required: true
    }
}, {
    timestamps: true
});

const FooterModel = mongoose.model("Footer", FooterSchema);
module.exports = FooterModel;
