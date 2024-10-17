const VoucherService = require('../services/VoucherService');

// Tạo Voucher
const createVoucher = async (req, res) => {
    try {
        const newVoucher = await VoucherService.createVoucher(req.body);
        return res.status(201).json({
            status: 'OK',
            message: 'Tạo voucher thành công',
            data: newVoucher
        });
    } catch (error) {
        return res.status(500).json({
            status: 'ERR',
            message: 'Đã xảy ra lỗi khi tạo voucher'
        });
    }
};

// Lấy tất cả Voucher
const getAllVouchers = async (req, res) => {
    try {
        const vouchers = await VoucherService.getAllVouchers();
        return res.status(200).json({
            status: 'OK',
            data: vouchers
        });
    } catch (error) {
        return res.status(500).json({
            status: 'ERR',
            message: 'Đã xảy ra lỗi khi lấy danh sách voucher'
        });
    }
};

// Lấy Voucher theo id
const getVoucherById = async (req, res) => {
    try {
        const { idVoucher } = req.params;
        const voucher = await VoucherService.getVoucherById(idVoucher);
        if (!voucher) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Voucher không tồn tại'
            });
        }
        return res.status(200).json({
            status: 'OK',
            data: voucher
        });
    } catch (error) {
        return res.status(500).json({
            status: 'ERR',
            message: 'Đã xảy ra lỗi khi lấy thông tin voucher'
        });
    }
};

// Cập nhật Voucher
const updateVoucher = async (req, res) => {
    try {
        const { idVoucher } = req.params;
        const updatedVoucher = await VoucherService.updateVoucher(idVoucher, req.body);
        if (!updatedVoucher) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Voucher không tồn tại'
            });
        }
        return res.status(200).json({
            status: 'OK',
            message: 'Cập nhật voucher thành công',
            data: updatedVoucher
        });
    } catch (error) {
        return res.status(500).json({
            status: 'ERR',
            message: 'Đã xảy ra lỗi khi cập nhật voucher'
        });
    }
};

// Xóa Voucher
const deleteVoucher = async (req, res) => {
    try {
        const { idVoucher } = req.params;
        const deletedVoucher = await VoucherService.deleteVoucher(idVoucher);
        if (!deletedVoucher) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Voucher không tồn tại'
            });
        }
        return res.status(200).json({
            status: 'OK',
            message: 'Xóa voucher thành công'
        });
    } catch (error) {
        return res.status(500).json({
            status: 'ERR',
            message: 'Đã xảy ra lỗi khi xóa voucher'
        });
    }
};

module.exports = {
    createVoucher,
    getAllVouchers,
    getVoucherById,
    updateVoucher,
    deleteVoucher
};
