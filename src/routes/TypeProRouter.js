const express = require('express');
const router = express.Router();
const TypeProController = require('../controllers/TypeProController');
const multer = require('multer');

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


// Định nghĩa các route
router.post('/create', upload.single('imageType'), TypeProController.createTypePro); // Sử dụng multer để upload file ảnh
router.get('/get', TypeProController.getAllTypePros);
router.get('/getbyid/:idType', TypeProController.getTypeProById);
router.put('/update/:idType', TypeProController.updateTypePro);
router.delete('/delete/:idType', TypeProController.deleteTypePro);

module.exports = router;


