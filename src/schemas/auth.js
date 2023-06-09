import joi from "joi";

export const signinSchema = joi.object({
    email: joi.string().email().required().messages({
        "string.empty": 'Trường "email" không được để trống',
        "string.email": 'Trường "email" không đúng định dạng',
        "any.required": 'Trường "email" là bắt buộc',
    }),
    password: joi.string().min(6).required().messages({
        "string.empty": 'Trường "mật khẩu" không được để trống',
        "string.min": 'Trường "mật khẩu" phải có ít nhất 6 ký tự',
        "any.required": "Trường mật khẩu là bắt buộc",
    })
})