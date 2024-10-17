const Voucher = require('../models/VoucherModel');

// Tạo Voucher mới
const createVoucher = async (data) => {
    const voucher = new Voucher(data);
    return await voucher.save();
};

// Lấy tất cả Voucher
const getAllVouchers = async () => {
    return await Voucher.find().populate('idPro');
};

// Lấy Voucher theo id
const getVoucherById = async (idVoucher) => {
    return await Voucher.findById(idVoucher).populate('idPro');
};

// Cập nhật Voucher
const updateVoucher = async (idVoucher, data) => {
    return await Voucher.findByIdAndUpdate(idVoucher, data, { new: true });
};

// Xóa Voucher
const deleteVoucher = async (idVoucher) => {
    return await Voucher.findByIdAndDelete(idVoucher);
};

module.exports = {
    createVoucher,
    getAllVouchers,
    getVoucherById,
    updateVoucher,
    deleteVoucher
};
