const Admin = require('../models/AdminModel');

// Tạo admin mới
const createAdmin = async (data) => {
    const admin = new Admin(data);
    return await admin.save();
};

// Lấy tất cả admin
const getAllAdmins = async () => {
    return await Admin.find();
};

// Lấy admin theo id
const getAdminById = async (idAD) => {
    return await Admin.findById(idAD);
};

// Cập nhật admin
const updateAdmin = async (idAD, data) => {
    return await Admin.findByIdAndUpdate(idAD, data, { new: true });
};

// Xóa admin
const deleteAdmin = async (idAD) => {
    return await Admin.findByIdAndDelete(idAD);
};

module.exports = {
    createAdmin,
    getAllAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin
};
