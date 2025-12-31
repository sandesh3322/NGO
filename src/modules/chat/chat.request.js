const Joi = require("joi");

const ChatCreateDTO = Joi.object({
  name: Joi.string()
    .min(2)
    .max(100)
    .required(),

  email: Joi.string()
    .email()
    .required(),

  phone: Joi.string()
    .pattern(/^\+?[0-9]{7,15}$/)
    .optional()
    .allow(null, ""),

  subject: Joi.string()
    .min(3)
    .max(150)
    .optional()
    .default("Chat Form Message"),

  message: Joi.string()
    .min(10)
    .max(2000)
    .required(),
});

const ChatUpdateDTO = Joi.object({
  name: Joi.string()
    .min(2)
    .max(100)
    .optional(),

  email: Joi.string()
    .email()
    .optional(),

  phone: Joi.string()
    .pattern(/^\+?[0-9]{7,15}$/)
    .optional()
    .allow(null, ""),

  subject: Joi.string()
    .min(3)
    .max(150)
    .optional(),

  message: Joi.string()
    .min(10)
    .max(2000)
    .optional(),

  isRead: Joi.boolean()
    .optional(),
});

module.exports = {
  ChatCreateDTO,
  ChatUpdateDTO,
};
