// src/config/multerConfig.js
const multer = require('multer');
const path = require('path');

// Cấu hình nơi lưu trữ file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Đường dẫn lưu file
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Đặt tên file với timestamp
    }
});

// Khởi tạo multer với cấu hình
const upload = multer({ storage: storage });

module.exports = upload;
