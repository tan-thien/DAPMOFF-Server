const CusService = require('../services/CusService');

// Tạo khách hàng
const createCus = async (req, res) => {
    try {
        const newCus = await CusService.createCus(req.body);
        return res.status(201).json({
            status: 'OK',
            message: 'Tạo khách hàng thành công',
            data: newCus
        });
    } catch (error) {
        console.error('Lỗi khi tạo khách hàng:', error);
        return res.status(500).json({
            status: 'ERR',
            message: 'Đã xảy ra lỗi khi tạo khách hàng'
        });
    }
};

// Lấy tất cả khách hàng
const getAllCus = async (req, res) => {
    try {
        const cus = await CusService.getAllCus();
        return res.status(200).json({
            status: 'OK',
            data: cus
        });
    } catch (error) {
        console.error('Lỗi khi lấy danh sách khách hàng:', error);
        return res.status(500).json({
            status: 'ERR',
            message: 'Đã xảy ra lỗi khi lấy danh sách khách hàng'
        });
    }
};

// Lấy khách hàng theo id
const getCusById = async (req, res) => {
    try {
        const { idCus } = req.params;
        const cus = await CusService.getCusById(idCus);

        if (!cus) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Khách hàng không tồn tại'
            });
        }

        return res.status(200).json({
            status: 'OK',
            data: cus
        });
    } catch (error) {
        console.error('Lỗi khi lấy thông tin khách hàng:', error);
        return res.status(500).json({
            status: 'ERR',
            message: 'Đã xảy ra lỗi khi lấy thông tin khách hàng'
        });
    }
};

// Cập nhật khách hàng
const updateCus = async (req, res) => {
    try {
        const { idCus } = req.params;
        const updatedCus = await CusService.updateCus(idCus, req.body);

        if (!updatedCus) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Khách hàng không tồn tại'
            });
        }

        return res.status(200).json({
            status: 'OK',
            message: 'Cập nhật khách hàng thành công',
            data: updatedCus
        });
    } catch (error) {
        console.error('Lỗi khi cập nhật khách hàng:', error);
        return res.status(500).json({
            status: 'ERR',
            message: 'Đã xảy ra lỗi khi cập nhật khách hàng'
        });
    }
};

// Xóa khách hàng
const deleteCus = async (req, res) => {
    try {
        const { idCus } = req.params;
        const deletedCus = await CusService.deleteCus(idCus);

        if (!deletedCus) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Khách hàng không tồn tại'
            });
        }

        return res.status(200).json({
            status: 'OK',
            message: 'Xóa khách hàng thành công'
        });
    } catch (error) {
        console.error('Lỗi khi xóa khách hàng:', error);
        return res.status(500).json({
            status: 'ERR',
            message: 'Đã xảy ra lỗi khi xóa khách hàng'
        });
    }
};

module.exports = {
    createCus,
    getAllCus,
    getCusById,
    updateCus,
    deleteCus
};
