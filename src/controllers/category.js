import Category from "../models/category";

export const create = async(req,res)=>{
    try{
        const category = await Category.create(req.body);
        if(!category){
            return res.status(400).json({
                message: "Can't create category"
            });
        }
        return res.status(201).json({
            message: "Category created",
            category
        });
    } catch(error){
        return res.status(500).json({
            message: error
        })
    }
}

