const express = require('express');
const router = express.Router();
const multer = require('multer'); // Thêm dòng này
const ProductsController = require('../controllers/ProductsController');
const path = require('path'); // Add this line to import the path module



// Cấu hình `multer` với lưu trữ và tên file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/pro'); // Thư mục lưu trữ ảnh
    },
    filename: function (req, file, cb) {
        // Đặt tên file với tiền tố thời gian và tên file gốc không dấu cách
        const uniquePrefix = Date.now();
        const sanitizedFilename = file.originalname.replace(/\s+/g, '_'); // Thay khoảng trắng bằng dấu gạch dưới
        cb(null, `${uniquePrefix}-${sanitizedFilename}`);
    }
});

// Bộ lọc để chỉ cho phép upload các file ảnh
const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
        cb(null, true);
    } else {
        cb(new Error('Chỉ cho phép tải lên ảnh!'), false);
    }
};

// Cấu hình `multer` với giới hạn kích thước và bộ lọc file
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Giới hạn kích thước ảnh (5MB)
    fileFilter: fileFilter
});


// Định nghĩa các route
router.post('/create', upload.single('imagePro'), ProductsController.createProduct);
router.get('/get', ProductsController.getAllProducts);
router.get('/getbyid/:id', ProductsController.getProductById);
router.put('/update/:id', ProductsController.updateProduct);
router.delete('/delete/:id', ProductsController.deleteProduct);

module.exports = router;
