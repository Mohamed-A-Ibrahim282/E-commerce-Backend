import joi from 'joi';


export const productValidation = joi.object({
    title:   joi.string().required(),
    slug: joi.string(),
    discription: joi.string(),
    imageCover: joi.string(),
    images: joi.array(),
    price: joi.number().required(),
    priceAfterDiscount:joi.number().required(),
    sold: joi.number().required(),
    stock: joi.number().required(),
    category: joi.string().required(),
    subcategory: joi.string().required(),
    brand:joi.string().required(),
    rateAvg: joi.number().required(),
    rateCount:joi.number().required(),
    createdBy: joi.string().required(),
});