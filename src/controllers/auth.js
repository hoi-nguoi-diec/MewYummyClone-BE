import User from "../models/users";
import { signInSchema } from "../schemas/auth";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const signIn = async (req, res) => {
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