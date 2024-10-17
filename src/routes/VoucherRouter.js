const express = require('express');
const router = express.Router();
const VoucherController = require('../controllers/VoucherController');

// Định nghĩa các route
router.post('/create', VoucherController.createVoucher);
router.get('/get', VoucherController.getAllVouchers);
router.get('/getbyid/:idVoucher', VoucherController.getVoucherById);
router.put('/update/:idVoucher', VoucherController.updateVoucher);
router.delete('/delete/:idVoucher', VoucherController.deleteVoucher);

module.exports = router;
