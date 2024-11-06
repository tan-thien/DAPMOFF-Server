const Products = require('../models/ProductModel');

// Tạo Product mới
const createProduct = async (data) => {
    const product = new Products(data);
    return await product.save();
};

// Lấy tất cả Product
const getAllProducts = async () => {
    return await Products.find().populate('idType');
};

// Lấy Product theo id
const getProductById = async (id) => {
    return await Products.findById(id).populate('idType');
};

// Cập nhật Product
const updateProduct = async (id, data) => {
    return await Products.findByIdAndUpdate(id, data, { new: true });
};

// Xóa Product
const deleteProduct = async (id) => {
    return await Products.findByIdAndDelete(id);
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
