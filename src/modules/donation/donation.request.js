const Joi = require("joi");

// Validation for creating a donation submission
const DonationCreateDTO = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    phone: Joi.string()
        .pattern(/^[0-9+ -]*$/) // allow digits, +, space, dash
        .optional()
        .allow("", null),
    email: Joi.string().email().required(),
    image: Joi.string().required(), // URL of uploaded screenshot
    amount: Joi.number().positive().optional(),
    message: Joi.string().max(500).optional(), // optional donation message
    // status is optional on create, defaults to "pending"
});

// Validation for updating donation status
const DonationUpdateDTO = Joi.object({
    status: Joi.string()
        .valid("pending", "verified", "rejected")
        .required(),
});

module.exports = {
    DonationCreateDTO,
    DonationUpdateDTO
};
