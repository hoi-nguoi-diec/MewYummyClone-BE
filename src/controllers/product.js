import Products from "../models/products";
export const getAll = async (req, res) => {
    const {_page = 1, _limit = 10, _sort = "price", _order = "desc"} = req.query
    const options = {
        page: _page,
        limit: _limit,
        sort: {
            [_sort]: _order === "desc" ? -1 : 1,
        },
    };
    try {
        const {docs: products} = await Products.paginate({}, options)
        if (products.length === 0) {
            res.status(404).json({
                message: "Không có sản phẩm nào",
            });
        }
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};
export const get = async (req, res) => {
    try {
        const product = await Products.findById(req.params.id).populate("categoryId")
        if (!product ) {
            return res.status(404).json({
                message: "Không tìm thấy sản phẩm",
            });
        }
        return res.status(200).json({
            message: "Product found",
            data: product,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Lỗi server",
        });
    }
};

export const update = async (req, res) => {
    try {
        const product = await Products.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
        if (!product) {
            return res.status(404).json({
                message: "Không tìm thấy sản phẩm",
            });
        }
        return res.status(200).json({
            message: "Sản phẩm đã được cập nhật thành công",
            data: product,
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};