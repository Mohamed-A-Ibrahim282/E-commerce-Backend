import joi from 'joi';


export const categoryValidation = joi.object({
    name: joi.string().required(),
    slug: joi.string(),
    image: joi.string(),
    createdBy: joi.string().required(),
});