const TypeProService = require('../services/TypeProService');

// Tạo TypePro
const createTypePro = async (req, res) => {
    try {
        const newTypePro = await TypeProService.createTypePro(req.body);
        return res.status(201).json({
            status: 'OK',
            message: 'Tạo thành công',
            data: newTypePro
        });
    } catch (error) {
        return res.status(500).json({
            status: 'ERR',
            message: 'Đã xảy ra lỗi khi tạo TypePro'
        });
    }
};

// Lấy tất cả TypePro
const getAllTypePros = async (req, res) => {
    try {
        const typePros = await TypeProService.getAllTypePros();
        return res.status(200).json({
            status: 'OK',
            data: typePros
        });
    } catch (error) {
        return res.status(500).json({
            status: 'ERR',
            message: 'Đã xảy ra lỗi khi lấy danh sách TypePro'
        });
    }
};

// Lấy TypePro theo id
const getTypeProById = async (req, res) => {
    try {
        const { idTypePro } = req.params;
        const typePro = await TypeProService.getTypeProById(idTypePro);
        if (!typePro) {
            return res.status(404).json({
                status: 'ERR',
                message: 'TypePro không tồn tại'
            });
        }
        return res.status(200).json({
            status: 'OK',
            data: typePro
        });
    } catch (error) {
        return res.status(500).json({
            status: 'ERR',
            message: 'Đã xảy ra lỗi khi lấy thông tin TypePro'
        });
    }
};

// Cập nhật TypePro
const updateTypePro = async (req, res) => {
    try {
        const { idTypePro } = req.params;
        const updatedTypePro = await TypeProService.updateTypePro(idTypePro, req.body);
        if (!updatedTypePro) {
            return res.status(404).json({
                status: 'ERR',
                message: 'TypePro không tồn tại'
            });
        }
        return res.status(200).json({
            status: 'OK',
            message: 'Cập nhật thành công',
            data: updatedTypePro
        });
    } catch (error) {
        return res.status(500).json({
            status: 'ERR',
            message: 'Đã xảy ra lỗi khi cập nhật TypePro'
        });
    }
};

// Xóa TypePro
const deleteTypePro = async (req, res) => {
    try {
        const { idTypePro } = req.params;
        const deletedTypePro = await TypeProService.deleteTypePro(idTypePro);
        if (!deletedTypePro) {
            return res.status(404).json({
                status: 'ERR',
                message: 'TypePro không tồn tại'
            });
        }
        return res.status(200).json({
            status: 'OK',
            message: 'Xóa thành công'
        });
    } catch (error) {
        return res.status(500).json({
            status: 'ERR',
            message: 'Đã xảy ra lỗi khi xóa TypePro'
        });
    }
};

module.exports = {
    createTypePro,
    getAllTypePros,
    getTypeProById,
    updateTypePro,
    deleteTypePro
};
