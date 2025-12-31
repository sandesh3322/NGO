const Joi = require("joi");

// For creating a footer (all fields required for first creation)
const FooterCreateDTO = Joi.object({
    aboutText: Joi.string().allow("").optional(),
    contact: Joi.object({
        phone: Joi.string().allow("").optional(),
        email: Joi.string().email().allow("").optional(),
        address: Joi.string().allow("").optional()
    }).optional(),
    socialLinks: Joi.object({
        facebook: Joi.string().uri().allow("").optional(),
        twitter: Joi.string().uri().allow("").optional(),
        instagram: Joi.string().uri().allow("").optional(),
        linkedin: Joi.string().uri().allow("").optional()
    }).optional(),
    quickLinks: Joi.array().items(
        Joi.object({
            title: Joi.string().required(),
            url: Joi.string().uri().required()
        })
    ).optional(),
    copyrightText: Joi.string().allow("").optional()
});

// For updating a footer (all fields optional)
const FooterUpdateDTO = Joi.object({
    aboutText: Joi.string().allow("").optional(),
    contact: Joi.object({
        phone: Joi.string().allow("").optional(),
        email: Joi.string().email().allow("").optional(),
        address: Joi.string().allow("").optional()
    }).optional(),
    socialLinks: Joi.object({
        facebook: Joi.string().uri().allow("").optional(),
        twitter: Joi.string().uri().allow("").optional(),
        instagram: Joi.string().uri().allow("").optional(),
        linkedin: Joi.string().uri().allow("").optional()
    }).optional(),
    quickLinks: Joi.array().items(
        Joi.object({
            title: Joi.string().required(),
            url: Joi.string().uri().required()
        })
    ).optional(),
    copyrightText: Joi.string().allow("").optional()
});

module.exports = {
    FooterCreateDTO,
    FooterUpdateDTO
};
