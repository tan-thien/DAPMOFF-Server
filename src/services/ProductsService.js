const Products = require('../models/ProductModel');

// Tạo Product mới
const createProduct = async (data) => {
    const product = new Products(data);
    return await product.save();
};

// Lấy tất cả Product
const getAllProducts = async () => {
    return await Products.find().populate('idType').populate('idAD');
};

// Lấy Product theo id
const getProductById = async (idPro) => {
    return await Products.findById(idPro).populate('idType').populate('idAD');
};

// Cập nhật Product
const updateProduct = async (idPro, data) => {
    return await Products.findByIdAndUpdate(idPro, data, { new: true });
};

// Xóa Product
const deleteProduct = async (idPro) => {
    return await Products.findByIdAndDelete(idPro);
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
