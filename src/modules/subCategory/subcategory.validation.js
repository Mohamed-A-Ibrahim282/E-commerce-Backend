import Joi from "joi";

export const subcategoryValidation = Joi.object({
  name: Joi.string().required(),
  slug: Joi.string(),
  category: Joi.string().required(),
  createdBy: Joi.string(),
});
