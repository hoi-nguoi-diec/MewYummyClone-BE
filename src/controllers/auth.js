import User from "../models/user";
import { signInSchema, signupSchema } from "../schemas/auth";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
export const signup = async (req, res) => {
    try {
        const { error } = signupSchema.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((err) => err.message);

            return res.status(400).json({
                messages: errors,
            });
        }
        const userExist = await User.findOne({ email: req.body.email });
        if (userExist) {
            return res.status(400).json({
                messages: "Email đã tồn tại",
            });
        }

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


export const signin = async (req, res) => {
    try {
        const { error } = signInSchema.validate(req.body, { abortEarly: false});
        if(error){
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({
                messages: errors
            })
        }

        const user = await User.findOne({email: req.body.email});
        if(!user){
            return res.status(400).json({
                messages: "Email invalid"
            })
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if(!isMatch){
            return res.status(400).json({
                messages: "Wrong password"
            })
        }
        const token = jwt.sign({ id: user._id}, "aduvip", {expiresIn: "1d"});
        user.password = undefined;
        return res.status(200).json({
            message: "Login success",
            accessToken: token,
            user,
        })
    }catch(error){}
}
