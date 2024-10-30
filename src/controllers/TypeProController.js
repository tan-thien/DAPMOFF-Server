const mongoose = require('mongoose');
const TypeProService = require('../services/TypeProService');
const multer = require('multer');
const { ObjectId } = mongoose.Types; // Đảm bảo ObjectId được khai báo ở đây

// Config multer để lưu ảnh
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/typepro'); // Thư mục lưu ảnh
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Tên file lưu trữ
    }
});

const upload = multer({ storage });

// Tạo mới TypePro
// Tạo mới TypePro
const createTypePro = async (req, res) => {
    try {
        console.log('Received body:', req.body); // Log giá trị của req.body

        // Kiểm tra idCate có phải là chuỗi không
        if (!req.body.idCate || typeof req.body.idCate !== 'string') {
            return res.status(400).json({
                status: 'ERR',
                message: 'idCate không hợp lệ'
            });
        }

        const data = {
            nameType: req.body.nameType,
            statusType: req.body.statusType,
            imageType: req.file ? req.file.path : null, // Lưu đường dẫn file ảnh
            idCate: new mongoose.Types.ObjectId(req.body.idCate)
        };

        const newTypePro = await TypeProService.createTypePro(data);
        return res.status(201).json({
            status: 'OK',
            message: 'Tạo TypePro thành công',
            data: newTypePro
        });
    } catch (error) {
        console.error('Error:', error); // Log chi tiết lỗi
        return res.status(500).json({
            status: 'ERR',
            message: 'Đã xảy ra lỗi khi tạo TypePro'
        });
    }
};

// Lấy tất cả TypePro
const getAllTypePros = async (req, res) => {
    try {
        const typePros = await TypeProService.getAllTypePros();
        return res.status(200).json({
            status: 'OK',
            data: typePros
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'ERR',
            message: 'Đã xảy ra lỗi khi lấy danh sách TypePro'
        });
    }
};

// Lấy TypePro theo ID
const getTypeProById = async (req, res) => {
    try {
        const { idType } = req.params;
        const typePro = await TypeProService.getTypeProById(idType);
        if (!typePro) {
            return res.status(404).json({
                status: 'ERR',
                message: 'TypePro không tồn tại'
            });
        }
        return res.status(200).json({
            status: 'OK',
            data: typePro
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'ERR',
            message: 'Đã xảy ra lỗi khi lấy TypePro'
        });
    }
};

// Cập nhật TypePro
const updateTypePro = async (req, res) => {
    try {
        const { idType } = req.params;
        const updatedTypePro = await TypeProService.updateTypePro(idType, req.body);
        if (!updatedTypePro) {
            return res.status(404).json({
                status: 'ERR',
                message: 'TypePro không tồn tại'
            });
        }
        return res.status(200).json({
            status: 'OK',
            message: 'Cập nhật TypePro thành công',
            data: updatedTypePro
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'ERR',
            message: 'Đã xảy ra lỗi khi cập nhật TypePro'
        });
    }
};

// Xóa TypePro
const deleteTypePro = async (req, res) => {
    try {
        const { idType } = req.params; // Lấy idType từ params
    console.log('Trying to delete TypePro with idType:', idType); // Ghi log idType

    if (!idType) {
        return res.status(400).json({
            status: 'ERR',
            message: 'idType không hợp lệ'
        });
    }
        const deletedTypePro = await TypeProService.deleteTypePro(idType);
        if (!deletedTypePro) {
            return res.status(404).json({
                status: 'ERR',
                message: 'TypePro không tồn tại'
            });
        }
        return res.status(200).json({
            status: 'OK',
            message: 'Xóa TypePro thành công'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'ERR',
            message: 'Đã xảy ra lỗi khi xóa TypePro'
        });
    }
};

module.exports = {
    createTypePro,
    getAllTypePros,
    getTypeProById,
    updateTypePro,
    deleteTypePro,
    upload
};
