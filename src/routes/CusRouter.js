const express = require('express');
const router = express.Router();
const CusController = require('../controllers/CusController');

// Định nghĩa các route
router.post('/create', CusController.createCus);
router.get('/get', CusController.getAllCus);
router.get('/getbyid/:idCus', CusController.getCusById);
router.put('/update/:idCus', CusController.updateCus);
router.delete('/delete/:idCus', CusController.deleteCus);

module.exports = router;
