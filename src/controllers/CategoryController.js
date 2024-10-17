const CategoryService = require('../services/CategoryService');

// Tạo Category
const createCategory = async (req, res) => {
    try {
        const newCategory = await CategoryService.createCategory(req.body);
        return res.status(201).json({
            status: 'OK',
            message: 'Tạo danh mục thành công',
            data: newCategory
        });
    } catch (error) {
        return res.status(500).json({
            status: 'ERR',
            message: 'Đã xảy ra lỗi khi tạo danh mục'
        });
    }
};

// Lấy tất cả Category
const getAllCategories = async (req, res) => {
    try {
        const categories = await CategoryService.getAllCategories();
        return res.status(200).json({
            status: 'OK',
            data: categories
        });
    } catch (error) {
        return res.status(500).json({
            status: 'ERR',
            message: 'Đã xảy ra lỗi khi lấy danh sách danh mục'
        });
    }
};

// Lấy Category theo id
const getCategoryById = async (req, res) => {
    try {
        const { idCate } = req.params;
        const category = await CategoryService.getCategoryById(idCate);
        if (!category) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Danh mục không tồn tại'
            });
        }
        return res.status(200).json({
            status: 'OK',
            data: category
        });
    } catch (error) {
        return res.status(500).json({
            status: 'ERR',
            message: 'Đã xảy ra lỗi khi lấy thông tin danh mục'
        });
    }
};

// Cập nhật Category
const updateCategory = async (req, res) => {
    try {
        const { idCate } = req.params;
        const updatedCategory = await CategoryService.updateCategory(idCate, req.body);
        if (!updatedCategory) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Danh mục không tồn tại'
            });
        }
        return res.status(200).json({
            status: 'OK',
            message: 'Cập nhật danh mục thành công',
            data: updatedCategory
        });
    } catch (error) {
        return res.status(500).json({
            status: 'ERR',
            message: 'Đã xảy ra lỗi khi cập nhật danh mục'
        });
    }
};

// Xóa Category
const deleteCategory = async (req, res) => {
    try {
        const { idCate } = req.params;
        const deletedCategory = await CategoryService.deleteCategory(idCate);
        if (!deletedCategory) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Danh mục không tồn tại'
            });
        }
        return res.status(200).json({
            status: 'OK',
            message: 'Xóa danh mục thành công'
        });
    } catch (error) {
        return res.status(500).json({
            status: 'ERR',
            message: 'Đã xảy ra lỗi khi xóa danh mục'
        });
    }
};

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};
