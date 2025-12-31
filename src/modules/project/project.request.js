const Joi = require("joi");
const ProjectCreateDTO = Joi.object({
    title : Joi.string().min(3).max(100).required(),
    status: Joi.string().regex(/^(active|inactive)$/).required(),
    // status: Joi.string().valid(...Object.values(StatusType)).required(),
    image: Joi.string().required(),
    description: Joi.string().max(500).optional().allow("", null),


});
const ProjectUpdateDTO = Joi.object({
    title : Joi.string().min(3).max(100).required(),
    status: Joi.string().regex(/^(active|inactive)$/).required(),
    // status: Joi.string().valid(...Object.values(StatusType)).required(),
    image: Joi.string().optional(),
    description: Joi.string().max(500).optional().allow("", null),

});

// console.log(...Object.values(StatusType));

module.exports = {
 ProjectCreateDTO,
 ProjectUpdateDTO
}