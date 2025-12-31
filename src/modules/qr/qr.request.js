const Joi = require("joi");

const QrCreateDTO = Joi.object({
    phone: Joi.string().required(),
    bankAccount: Joi.string().required(),
    bankName: Joi.string().required(),
    image: Joi.string().uri().required(), // QR image URL
});

const QrUpdateDTO = Joi.object({
    phone: Joi.string().optional(),
    bankAccount: Joi.string().optional(),
    bankName: Joi.string().optional(),
    image: Joi.string().uri().optional(), // QR image URL
});

module.exports = {
    QrCreateDTO,
    QrUpdateDTO
};
