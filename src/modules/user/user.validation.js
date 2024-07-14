import joi from 'joi';


export const signupValidation = joi.object({
    name: joi.string().min(3).max(20).required(),
    email: joi.string().email().required(),
    password: joi.string().pattern(/^[A-Z][a-zA-Z0-9]{8,40}$/).required(),
    role: joi.string().valid('user', 'admin').required(),
});

export const signinValidation = joi.object({
    email: joi.string().email(),
    password: joi.string().pattern(/^[A-Z][a-zA-Z0-9]{8,40}$/).required(),
});

export const updateUserValidation = joi.object({
    name: joi.string().min(3).max(20),
    email: joi.string().email(),
    password: joi.string().pattern(/^[A-Z][a-zA-Z0-9]{8,40}$/),
    role: joi.string().valid('user', 'admin'),
    id: joi.string()
});