const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');
const upload = require('../config/multerConfig'); // Đường dẫn đến file cấu hình multer

// Định nghĩa các route
router.post('/create', upload.single('imageCate'), CategoryController.createCategory);
router.get('/get', CategoryController.getAllCategories);
router.get('/getbyid/:idCate', CategoryController.getCategoryById);
router.put('/update/:idCate', CategoryController.updateCategory);
router.delete('/delete/:idCate', CategoryController.deleteCategory);

module.exports = router;
