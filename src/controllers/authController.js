// src/controllers/authController.js
const AuthService = require('../services/AuthService');
const bcrypt = require('bcrypt');
const Account = require('../models/AccountModel');
const Cus = require('../models/CusModel');

const register = async (req, res) => {
    try {
        const { nameAcc, password, nameCus, addressCus, sexCus, phoneCus, emailCus, idAccType } = req.body;

        // Ensure that idAccType is passed correctly
        const existingCus = await Cus.findOne({ emailCus });
        if (existingCus) {
            return res.status(400).json({ message: 'Email đã tồn tại.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo tài khoản mới với `idAccType`
        const newAccount = new Account({
            nameAcc,
            password: hashedPassword,
            idAccType: req.body.idAccType 
        });
        if (!req.body.idAccType) {
            return res.status(400).json({ message: "idAccType is required" });
          }
        await newAccount.save();

        // Tạo hồ sơ khách hàng
        const newCus = new Cus({
            nameCus,
            addressCus,
            sexCus,
            phoneCus,
            emailCus,
            idAcc: newAccount._id
        });
        await newCus.save();

        res.status(201).json({ message: 'Đăng ký thành công', newCus });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Đăng ký thất bại' });
    }
};



module.exports = { register };
