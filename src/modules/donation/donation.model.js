const mongoose = require("mongoose");

const DonationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String },
    email: { type: String, required: true },
    image: { type: String, required: true }, // uploaded to Cloudinary
    amount: { type: Number }, // optional if QR is static
    message: { type: String },
    status: { type: String, enum: ["pending", "verified", "rejected"], default: "pending" },
    createdAt: { type: Date, default: Date.now },
    verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Donation", DonationSchema);
