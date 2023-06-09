import dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import Product from "../models/product";
export const create = async (req, res) => {
    try {
        // const { data: product } = await axios.post(`${process.env.API_URL}`, req.body);
        const product = await Product.create(req.body)
        if (!product) {
            return res.status(400).json({
                message: "Không thể tạo sản phẩm",
            });
        }
        await Category.findByIdAndUpdate(product.categoryId, {
            $addToSet: {
                product: product._id,
            }
        })
        return res.status(200).json({
            message: "Product created",
            data: product,
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};
export const remove = async (req, res) => {
    try {
        // await axios.delete(`${process.env.API_URL}/${req.params.id}`);
        await Product.findOneAndDelete({_id: req.params.id})
        return res.status(200).json({
            message: "Sản phẩm đã được xóa thành công",
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};