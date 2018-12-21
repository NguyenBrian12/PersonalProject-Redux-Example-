const Joi = require("joi");
const schema = {
  id: Joi.number(),
  firstName: Joi.string()
    .min(2)
    .max(50)
    .required(),
  lastName: Joi.string()
    .min(2)
    .max(50)
    .required(),
  birthYear: Joi.number(),
  birthMonth: Joi.number(),
  birthDay: Joi.number()
};
module.exports = Joi.object().keys(schema);
