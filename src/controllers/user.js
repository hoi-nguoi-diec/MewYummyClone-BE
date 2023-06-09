import Users from "../models/user";

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
export const get = async (req, res) => {
    try {
        const users = await Users.findById(req.params.id);
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