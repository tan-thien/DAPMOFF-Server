const Category = require('../models/CategoryModel');

// Tạo Category mới
const createCategory = async (data) => {
    const category = new Category(data);
    return await category.save();
};

// Lấy tất cả Category
const getAllCategories = async () => {
    return await Category.find().populate('idAD');
};

// Lấy Category theo id
const getCategoryById = async (idCate) => {
    return await Category.findById(idCate).populate('idAD');
};

// Cập nhật Category
const updateCategory = async (idCate, data) => {
    return await Category.findByIdAndUpdate(idCate, data, { new: true });
};

// Xóa Category
const deleteCategory = async (idCate) => {
    return await Category.findByIdAndDelete(idCate);
};

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};
