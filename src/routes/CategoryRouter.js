const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');

// Định nghĩa các route
router.post('/create', CategoryController.createCategory);
router.get('/get', CategoryController.getAllCategories);
router.get('/getbyid/:idCate', CategoryController.getCategoryById);
router.put('/update/:idCate', CategoryController.updateCategory);
router.delete('/delete/:idCate', CategoryController.deleteCategory);

module.exports = router;
