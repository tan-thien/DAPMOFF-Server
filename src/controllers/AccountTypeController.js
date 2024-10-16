// src/controllers/AccountTypeController.js
const AccountTypeService = require('../services/AccountTypeService');

// Tạo AccountType
const createAccountType = async (req, res) => {
    try {
        const newAccountType = await AccountTypeService.createAccountType(req.body);
        return res.status(201).json({
            status: 'OK',
            message: 'Tạo tài khoản thành công',
            data: newAccountType
        });
    } catch (error) {
        console.error('Lỗi khi tạo tài khoản:', error);
        return res.status(500).json({
            status: 'ERR',
            message: 'Đã xảy ra lỗi khi tạo tài khoản'
        });
    }
};

// Lấy tất cả AccountType
const getAllAccountTypes = async (req, res) => {
    try {
        const accountTypes = await AccountTypeService.getAllAccountTypes();
        return res.status(200).json({
            status: 'OK',
            data: accountTypes
        });
    } catch (error) {
        console.error('Lỗi khi lấy danh sách tài khoản:', error);
        return res.status(500).json({
            status: 'ERR',
            message: 'Đã xảy ra lỗi khi lấy danh sách tài khoản'
        });
    }
};

// Lấy AccountType theo id
const getAccountTypeById = async (req, res) => {
    try {
        const { idAccType } = req.params;
        const accountType = await AccountTypeService.getAccountTypeById(idAccType);
        
        if (!accountType) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Tài khoản không tồn tại'
            });
        }

        return res.status(200).json({
            status: 'OK',
            data: accountType
        });
    } catch (error) {
        console.error('Lỗi khi lấy thông tin tài khoản:', error);
        return res.status(500).json({
            status: 'ERR',
            message: 'Đã xảy ra lỗi khi lấy thông tin tài khoản'
        });
    }
};

// Cập nhật AccountType
const updateAccountType = async (req, res) => {
    try {
        const { idAccType } = req.params;
        const updatedAccountType = await AccountTypeService.updateAccountType(idAccType, req.body);

        if (!updatedAccountType) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Tài khoản không tồn tại'
            });
        }

        return res.status(200).json({
            status: 'OK',
            message: 'Cập nhật tài khoản thành công',
            data: updatedAccountType
        });
    } catch (error) {
        console.error('Lỗi khi cập nhật tài khoản:', error);
        return res.status(500).json({
            status: 'ERR',
            message: 'Đã xảy ra lỗi khi cập nhật tài khoản'
        });
    }
};

// Xóa AccountType
const deleteAccountType = async (req, res) => {
    try {
        const { idAccType } = req.params;
        const deletedAccountType = await AccountTypeService.deleteAccountType(idAccType);

        if (!deletedAccountType) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Tài khoản không tồn tại'
            });
        }

        return res.status(200).json({
            status: 'OK',
            message: 'Xóa tài khoản thành công'
        });
    } catch (error) {
        console.error('Lỗi khi xóa tài khoản:', error);
        return res.status(500).json({
            status: 'ERR',
            message: 'Đã xảy ra lỗi khi xóa tài khoản'
        });
    }
};

module.exports = {
    createAccountType,
    getAllAccountTypes,
    getAccountTypeById,
    updateAccountType,
    deleteAccountType
};
