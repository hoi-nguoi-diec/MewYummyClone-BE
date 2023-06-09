import Users from "../models/users";

export const getAll = async (req, res) => {
    try {
        const users = await Users.find();
        if (users.length === 0) {
            res.status(404).json({
                message: "Không có danh mục nào",
            });
        }
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    } 
};