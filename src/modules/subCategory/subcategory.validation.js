import joi from 'joi';


export const subcategoryValidation = joi.object({
    name: joi.string().required(),
    slug: joi.string(),
    category: joi.string().required(),
    createdBy: joi.string(),
});