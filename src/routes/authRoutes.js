const express = require('express');
const { register } = require('../controllers/authController');
const router = express.Router();

// Định nghĩa route cho đăng ký
router.post('/register', register);

module.exports = router;
