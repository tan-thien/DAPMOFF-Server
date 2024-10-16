// src/routes/AccountTypeRouter.js
const express = require('express');
const router = express.Router();
const AccountTypeController = require('../controllers/AccountTypeController');

// Định nghĩa các route
router.post('/create', AccountTypeController.createAccountType);
router.get('/get', AccountTypeController.getAllAccountTypes);
router.get('/getbyid:idAccType', AccountTypeController.getAccountTypeById);
router.put('/update:idAccType', AccountTypeController.updateAccountType);
router.delete('/delete:idAccType', AccountTypeController.deleteAccountType);

module.exports = router;
