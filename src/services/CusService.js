const Cus = require('../models/CusModel');

// Tạo khách hàng mới
const createCus = async (data) => {
    const cus = new Cus(data);
    return await cus.save();
};

// Lấy tất cả khách hàng
const getAllCus = async () => {
    return await Cus.find();
};

// Lấy khách hàng theo id
const getCusById = async (idCus) => {
    return await Cus.findById(idCus);
};

// Cập nhật khách hàng
const updateCus = async (idCus, data) => {
    return await Cus.findByIdAndUpdate(idCus, data, { new: true });
};

// Xóa khách hàng
const deleteCus = async (idCus) => {
    return await Cus.findByIdAndDelete(idCus);
};

module.exports = {
    createCus,
    getAllCus,
    getCusById,
    updateCus,
    deleteCus
};
