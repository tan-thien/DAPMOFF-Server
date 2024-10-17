const ProductsService = require('../services/ProductsService');

// Tạo Product
const createProduct = async (req, res) => {
    try {
        const newProduct = await ProductsService.createProduct(req.body);
        return res.status(201).json({
            status: 'OK',
            message: 'Tạo sản phẩm thành công',
            data: newProduct
        });
    } catch (error) {
        return res.status(500).json({
            status: 'ERR',
            message: 'Đã xảy ra lỗi khi tạo sản phẩm'
        });
    }
};

// Lấy tất cả Product
const getAllProducts = async (req, res) => {
    try {
        const products = await ProductsService.getAllProducts();
        return res.status(200).json({
            status: 'OK',
            data: products
        });
    } catch (error) {
        return res.status(500).json({
            status: 'ERR',
            message: 'Đã xảy ra lỗi khi lấy danh sách sản phẩm'
        });
    }
};

// Lấy Product theo id
const getProductById = async (req, res) => {
    try {
        const { idPro } = req.params;
        const product = await ProductsService.getProductById(idPro);
        if (!product) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Sản phẩm không tồn tại'
            });
        }
        return res.status(200).json({
            status: 'OK',
            data: product
        });
    } catch (error) {
        return res.status(500).json({
            status: 'ERR',
            message: 'Đã xảy ra lỗi khi lấy thông tin sản phẩm'
        });
    }
};

// Cập nhật Product
const updateProduct = async (req, res) => {
    try {
        const { idPro } = req.params;
        const updatedProduct = await ProductsService.updateProduct(idPro, req.body);
        if (!updatedProduct) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Sản phẩm không tồn tại'
            });
        }
        return res.status(200).json({
            status: 'OK',
            message: 'Cập nhật sản phẩm thành công',
            data: updatedProduct
        });
    } catch (error) {
        return res.status(500).json({
            status: 'ERR',
            message: 'Đã xảy ra lỗi khi cập nhật sản phẩm'
        });
    }
};

// Xóa Product
const deleteProduct = async (req, res) => {
    try {
        const { idPro } = req.params;
        const deletedProduct = await ProductsService.deleteProduct(idPro);
        if (!deletedProduct) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Sản phẩm không tồn tại'
            });
        }
        return res.status(200).json({
            status: 'OK',
            message: 'Xóa sản phẩm thành công'
        });
    } catch (error) {
        return res.status(500).json({
            status: 'ERR',
            message: 'Đã xảy ra lỗi khi xóa sản phẩm'
        });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};