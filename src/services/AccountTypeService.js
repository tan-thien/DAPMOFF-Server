// src/services/AccountTypeService.js
const AccountType = require('../models/AccountTypeModel');

// Tạo AccountType mới
const createAccountType = async (data) => {
    const accountType = new AccountType(data);
    return await accountType.save();
};

// Lấy tất cả AccountType
const getAllAccountTypes = async () => {
    return await AccountType.find();
};

// Lấy AccountType theo id
const getAccountTypeById = async (idAccType) => {
    return await AccountType.findById(idAccType);
};

// Cập nhật AccountType
const updateAccountType = async (idAccType, data) => {
    return await AccountType.findByIdAndUpdate(idAccType, data, { new: true });
};

// Xóa AccountType
const deleteAccountType = async (idAccType) => {
    return await AccountType.findByIdAndDelete(idAccType);
};

module.exports = {
    createAccountType,
    getAllAccountTypes,
    getAccountTypeById,
    updateAccountType,
    deleteAccountType
};
