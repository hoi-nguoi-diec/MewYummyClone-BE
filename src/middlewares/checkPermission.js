import jwt from "jsonwebtoken";
import User from "../models/users";

export const checkPermission = async (req, res, next) => {

    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!authHeader) {
        return res.status(401).json({
            message: "You must login first",
        });
    }

    jwt.verify(token, "aduvip", async (error, payload) => {
        if (error) {
            if (error.name === "JsonWebTokenError") {
                return res.status(400).json({
                    message: "Token invalid",
                });
            }
            if (error.name === "TokenExpiredError") { 
                return res.status(400).json({
                    message: "Token expired",
                });
            }
        }
        const user = await User.findById(payload.id);
        if (user.role !== "admin") {
            return res.status(403).json({
                message: "BYou don't have permission",
            });
        }
        next();
    });
};
