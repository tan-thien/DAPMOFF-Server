const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');

// Định nghĩa các route
router.post('/create', AdminController.createAdmin);
router.get('/get', AdminController.getAllAdmins);
router.get('/getbyid/:idAD', AdminController.getAdminById);
router.put('/update/:idAD', AdminController.updateAdmin);
router.delete('/delete/:idAD', AdminController.deleteAdmin);

module.exports = router;
