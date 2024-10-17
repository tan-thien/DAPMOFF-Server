const TypePro = require('../models/TypeProModel');

// Tạo TypePro mới
const createTypePro = async (data) => {
    const typePro = new TypePro(data);
    return await typePro.save();
};

// Lấy tất cả TypePro
const getAllTypePros = async () => {
    return await TypePro.find();
};

// Lấy TypePro theo id
const getTypeProById = async (idTypePro) => {
    return await TypePro.findById(idTypePro);
};

// Cập nhật TypePro
const updateTypePro = async (idTypePro, data) => {
    return await TypePro.findByIdAndUpdate(idTypePro, data, { new: true });
};

// Xóa TypePro
const deleteTypePro = async (idTypePro) => {
    return await TypePro.findByIdAndDelete(idTypePro);
};

module.exports = {
    createTypePro,
    getAllTypePros,
    getTypeProById,
    updateTypePro,
    deleteTypePro
};
