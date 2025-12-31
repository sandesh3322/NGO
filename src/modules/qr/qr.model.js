const mongoose = require("mongoose");

const QrSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true
    },
    bankAccount: {
        type: String,
        required: true
    },
    bankName: {
        type: String,
        required: true
    },
    image: {
        type: String, // cloudinary URL
        required: true
    },
}, {
    timestamps: true,
    autoIndex: true,
    autoCreate: true
});

// Enforce single document


const QrModel = mongoose.model("Qr", QrSchema);
module.exports = QrModel;
