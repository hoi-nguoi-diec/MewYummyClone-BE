import joi from "joi";

export const signInSchema = joi.object({
    email: joi.string().email().required().messages({
        "string.empty": 'Email is not empty',
        "string.email": 'Email invalid',
        "any.required": 'You must input your email',
    }),
    password: joi.string().min(6).required().messages({
        "string.empty": 'Password is not empty',
        "string.min": 'Password cannot be more than 6 characters',
        "any.required": "You must input your password",
    })
})