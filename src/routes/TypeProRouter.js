const express = require('express');
const router = express.Router();
const TypeProController = require('../controllers/TypeProController');

// Định nghĩa các route
router.post('/create', TypeProController.createTypePro);
router.get('/get', TypeProController.getAllTypePros);
router.get('/getbyid/:idTypePro', TypeProController.getTypeProById);
router.put('/update/:idTypePro', TypeProController.updateTypePro);
router.delete('/delete/:idTypePro', TypeProController.deleteTypePro);

module.exports = router;
