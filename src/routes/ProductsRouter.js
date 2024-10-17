const express = require('express');
const router = express.Router();
const ProductsController = require('../controllers/ProductsController');

// Định nghĩa các route
router.post('/create', ProductsController.createProduct);
router.get('/get', ProductsController.getAllProducts);
router.get('/getbyid/:idPro', ProductsController.getProductById);
router.put('/update/:idPro', ProductsController.updateProduct);
router.delete('/delete/:idPro', ProductsController.deleteProduct);

module.exports = router;
