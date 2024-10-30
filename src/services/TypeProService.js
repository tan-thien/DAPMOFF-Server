const TypePro = require('../models/TypeProModel');

const createTypePro = async (data) => {
    try {
        const newTypePro = await TypePro.create(data);
        return newTypePro;
    } catch (error) {
        throw new Error('Lỗi khi tạo TypePro: ' + error.message);
    }
};

const updateTypePro = async (idType, updateData) => {
    try {
        const updatedTypePro = await TypePro.findOneAndUpdate({ idType }, updateData, { new: true });
        return updatedTypePro;
    } catch (error) {
        throw new Error('Lỗi khi cập nhật TypePro: ' + error.message);
    }
};

const deleteTypePro = async (idType) => {
    try {
        console.log('Trying to delete TypePro with idType:', idType); // Ghi log giá trị idType
        const deletedTypePro = await TypePro.findOneAndDelete({ idType });
        return deletedTypePro;
    } catch (error) {
        throw new Error('Lỗi khi xóa TypePro: ' + error.message);
    }
};

const getTypeProById = async (idType) => {
    try {
        const typePro = await TypePro.findOne({ idType });
        return typePro;
    } catch (error) {
        throw new Error('Lỗi khi lấy TypePro: ' + error.message);
    }
};

const getAllTypePros = async () => {
    try {
        const typePros = await TypePro.find({});
        return typePros;
    } catch (error) {
        throw new Error('Lỗi khi lấy danh sách TypePro: ' + error.message);
    }
};

module.exports = {
    createTypePro,
    updateTypePro,
    deleteTypePro,
    getTypeProById,
    getAllTypePros
};
