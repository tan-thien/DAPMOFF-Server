const mongoose = require('mongoose');
const UserService = require('../services/UserService');
const Cus = require('../models/CusModel');

// Hàm kiểm tra đầu vào chung
const validateInput = (req, res, isLogin = false) => {
    const { nameAcc, password, confirmPassword, idAccType } = req.body;

    if (!nameAcc || !password || (isLogin ? false : !confirmPassword)) {
        return res.status(400).json({
            status: "ERR",
            message: 'Tất cả thông tin là bắt buộc, ngoại trừ idAcc'
        });
    }

    if (!isLogin && password !== confirmPassword) {
        return res.status(400).json({
            status: "ERR",
            message: 'Mật khẩu và xác nhận mật khẩu không khớp'
        });
    }

    return null; // Không có lỗi
};

// Tạo người dùng mới
const createUser = async (req, res) => {
    try {
        const validationError = validateInput(req, res);
        if (validationError) return validationError;

        // Gọi service để tạo tài khoản mới
        const response = await UserService.createUser({
            nameAcc: req.body.nameAcc,
            password: req.body.password,
            idAccType: req.body.idAccType,
            status: req.body.status
        });
        return res.status(201).json(response); // Trả về mã 201 cho việc tạo thành công

    } catch (e) {
        console.error('Lỗi khi tạo tài khoản:', e);
        return res.status(500).json({
            status: 'ERR',
            message: 'Đã xảy ra lỗi khi tạo tài khoản'
        });
    }
};

// Đăng nhập người dùng
const loginUser = async (req, res) => {
    try {
        const validationError = validateInput(req, res, true); // true để kiểm tra cho login
        if (validationError) return validationError;

        // Gọi service để đăng nhập
        const response = await UserService.loginUser({
            nameAcc: req.body.nameAcc,
            password: req.body.password
        });
        return res.status(200).json(response);

    } catch (e) {
        console.error('Lỗi khi đăng nhập:', e);
        return res.status(500).json({
            status: 'ERR',
            message: 'Đã xảy ra lỗi khi đăng nhập'
        });
    }
};
// Cập nhật thông tin người dùng và Cus
const updateUser = async (req, res) => {
    try {
        const { idAcc } = req.params; // Lấy idAcc từ tham số URL
        console.log('idAcc nhận được là:', idAcc); // Log idAcc để kiểm tra
        const updateData = req.body;  // Lấy dữ liệu cập nhật từ body yêu cầu

        // Tìm và cập nhật tài khoản
        const updatedAccount = await UserService.updateUser(idAcc, updateData);

        if (!updatedAccount) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Tài khoản không tồn tại'
            });
        }

        // Tìm và cập nhật thông tin Cus (nếu có liên quan)
        if (updateData.cusData) {
            const updatedCus = await UserService.updateCus(idAcc, updateData.cusData);

            if (!updatedCus) {
                return res.status(404).json({
                    status: 'ERR',
                    message: 'Thông tin khách hàng không tồn tại'
                });
            }
        }

        return res.status(200).json({
            status: 'OK',
            message: 'Cập nhật tài khoản và thông tin khách hàng thành công',
            data: updatedAccount
        });

    } catch (e) {
        console.error('Lỗi khi cập nhật tài khoản:', e);
        return res.status(500).json({
            status: 'ERR',
            message: 'Đã xảy ra lỗi khi cập nhật tài khoản'
        });
    }
};
// Xóa tài khoản và Cus liên quan
const deleteUser = async (req, res) => {
    try {
        const { idAcc } = req.params; // Lấy idAcc từ tham số URL

        // Tìm và xóa tài khoản kèm theo Cus liên quan trong UserService
        const deletedUser = await UserService.deleteUser(idAcc);

        if (!deletedUser) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Tài khoản không tồn tại'
            });
        }

        return res.status(200).json({
            status: 'OK',
            message: 'Xóa tài khoản và thông tin khách hàng thành công'
        });

    } catch (e) {
        console.error('Lỗi khi xóa tài khoản:', e);
        return res.status(500).json({
            status: 'ERR',
            message: 'Đã xảy ra lỗi khi xóa tài khoản'
        });
    }
};

const getUserById = async (req, res) => {
    try {
        const { idAcc } = req.params;

        // Kiểm tra xem idAcc có phải là số không
        if (isNaN(idAcc)) {
            return res.status(400).json({
                status: 'ERR',
                message: 'ID tài khoản không hợp lệ'
            });
        }

        // Chuyển đổi idAcc thành số nguyên
        const user = await UserService.getUserById(Number(idAcc)); // Nếu idAcc là số nguyên

        if (!user) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Tài khoản không tồn tại'
            });
        }

        return res.status(200).json({
            status: 'OK',
            message: 'Lấy thông tin tài khoản thành công',
            data: user
        });

    } catch (e) {
        console.error('Lỗi khi lấy thông tin tài khoản:', e.message);
        return res.status(500).json({
            status: 'ERR',
            message: 'Đã xảy ra lỗi khi lấy thông tin tài khoản'
        });
    }
};




module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getUserById
};
