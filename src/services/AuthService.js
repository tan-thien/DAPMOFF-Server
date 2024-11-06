const bcrypt = require('bcrypt');
const Account = require('../models/AccountModel');
const Cus = require('../models/CusModel');

const register = async (data) => {
    try {
        const { nameAcc, password, nameCus, addressCus, sexCus, phoneCus, emailCus, idAccType } = data;

        // Kiểm tra email đã tồn tại
        const existingCus = await Cus.findOne({ emailCus });
        if (existingCus) {
            throw new Error('Email đã tồn tại.');
        }

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo tài khoản mới trong bảng Account
        const newAccount = new Account({
            nameAcc,
            password: hashedPassword,
            idAccType: idAccType || 2  // Default idAccType if not provided
        });
        await newAccount.save();

        // Tạo hồ sơ khách hàng trong bảng Cus với idAcc từ tài khoản đã tạo
        const newCus = new Cus({
            nameCus,
            addressCus,
            sexCus,
            phoneCus,
            emailCus,
            idAcc: newAccount._id  // Ensure idAcc is stored correctly
        });
        await newCus.save();

        return newCus;
    } catch (error) {
        console.error("Error during registration:", error.message);
        throw new Error("Đăng ký thất bại: " + error.message);
    }
};

module.exports = { register };
