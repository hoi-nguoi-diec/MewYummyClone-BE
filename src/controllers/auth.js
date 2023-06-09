import User from "../models/users";
import { signinSchema, signupSchema } from "../schemas/auth";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    try {
        // validate đầu vào
        const { error } = signupSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);

            return res.status(400).json({
                messages: errors,
            });
        }
        // Kiểm tra trong db có tk không?
        const userExist = await User.findOne({ email: req.body.email });
        if (userExist) {
            return res.status(400).json({
                messages: "Email đã tồn tại",
            });
        }
        // Mã hóa mật khẩu

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = await User.create({
            ...req.body,
            password: hashedPassword,
        });

        user.password = undefined;
        return res.status(201).json({
            message: "Tạo tài khoản thành công",
            user,
        });
    } catch (error) {}
};