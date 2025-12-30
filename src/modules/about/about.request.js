const Joi = require("joi");

const ChairmanMessageDTO = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  message: Joi.string().min(5).required(),
  imageUrl: Joi.string().uri().empty(null, "").optional().default(null),
});

const AboutCreateDTO = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  shortDescription: Joi.string().min(10).required(),
  mission: Joi.string().min(10).required(),
  vision: Joi.string().min(10).required(),
  history: Joi.string().optional().allow(""),
  chairmanMessage: ChairmanMessageDTO.required(),
  images: Joi.array().items(Joi.string().uri()).optional().default([]),
});

const AboutUpdateDTO = Joi.object({
  title: Joi.string().min(3).max(100).optional(),
  shortDescription: Joi.string().min(10).optional(),
  mission: Joi.string().min(10).optional(),
  vision: Joi.string().min(10).optional(),
  history: Joi.string().optional().allow(""),
  chairmanMessage: ChairmanMessageDTO.optional(),
  images: Joi.array().items(Joi.string().uri()).optional(),
});

module.exports = {
  AboutCreateDTO,
  AboutUpdateDTO,
};
