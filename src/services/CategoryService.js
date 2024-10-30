const Category = require("../models/CategoryModel");

// Tạo Category
const createCategory = async (newCategory) => {
    try {
        const createdCategory = await Category.create(newCategory);
        return {
            status: 'OK',
            message: 'Tạo danh mục thành công',
            data: createdCategory
        };
    } catch (error) {
        throw new Error('Lỗi khi tạo danh mục: ' + error.message);
    }
};

// Cập nhật Category
const updateCategory = async (idCate, updateData) => {
    try {
        const updatedCategory = await Category.findOneAndUpdate({ idCate }, updateData, { new: true });
        return updatedCategory;
    } catch (error) {
        throw new Error('Lỗi khi cập nhật danh mục: ' + error.message);
    }
};

// Xóa Category
const deleteCategory = async (idCate) => {
    try {
        const deletedCategory = await Category.findOneAndDelete({ idCate });
        return deletedCategory;
    } catch (error) {
        throw new Error('Lỗi khi xóa danh mục: ' + error.message);
    }
};

// Lấy Category theo ID
const getCategoryById = async (idCate) => {
    try {
        const category = await Category.findOne({ idCate });
        return category;
    } catch (error) {
        throw new Error('Lỗi khi lấy danh mục: ' + error.message);
    }
};

// Lấy tất cả Category
const getAllCategories = async () => {
    try {
        const categories = await Category.find({});
        return categories; // Trả về danh sách các danh mục
    } catch (error) {
        throw new Error('Lỗi khi lấy danh sách danh mục: ' + error.message);
    }
};

module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoryById,
    getAllCategories
};
