const Joi = require("joi");

const TeamCreateDTO = Joi.object({
  name: Joi.string()
    .min(3)
    .max(100)
    .required(),

  position: Joi.string()
    .min(2)
    .max(100)
    .required(),

  profileImage: Joi.string()
    .required(),

  rank: Joi.number()
    .integer()
    .min(1)
    .required(),

   status: Joi.string().regex(/^(active|inactive)$/).required(),
});
