const ProductsService = require('../services/ProductsService');
const Product = require('../models/ProductModel'); 

// Tạo Product
const createProduct = async (req, res) => {
    console.log('Request Body:', req.body); 
    try {
        const { namePro, descriptionPro, quantityPro, colorPro, pricePro, memoryPro, ramPro, statusPro, ngaySanXuat, baoHanh, idType } = req.body;
        const imagePro = req.file ? req.file.path : ''; // Lấy đường dẫn file nếu ảnh được tải lên

        const newProduct = new Product({
            namePro,
            imagePro: req.file.path, // Nếu bạn đang lưu đường dẫn hình ảnh
            descriptionPro,
            quantityPro: Number(quantityPro), // Chuyển đổi quantityPro thành số
            colorPro,
            pricePro: Number(pricePro), // Chuyển đổi pricePro thành số
            memoryPro,
            ramPro,
            statusPro,
            ngaySanXuat,
            baoHanh: Number(baoHanh), // Chuyển đổi baoHanh thành số
            idType
        });

        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Failed to create product' });
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
        const { id } = req.params;
        const product = await ProductsService.getProductById(id);
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
        const { id } = req.params;
        const updatedProduct = await ProductsService.updateProduct(id, req.body);
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
        const { id } = req.params;
        const deletedProduct = await ProductsService.deleteProduct(id);
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
