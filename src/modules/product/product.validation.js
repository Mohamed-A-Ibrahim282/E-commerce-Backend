import joi from "joi";

export const brandValidation = joi.object({
  name: joi.string().required(),
  slug: joi.string(),
  logo: joi.string(),
  createdBy: joi.string(),
});
