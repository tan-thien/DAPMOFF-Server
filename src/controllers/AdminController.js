const AdminService = require('../services/AdminService');

// Tạo admin
const createAdmin = async (req, res) => {
    try {
        const newAdmin = await AdminService.createAdmin(req.body);
        return res.status(201).json({
            status: 'OK',
            message: 'Tạo admin thành công',
            data: newAdmin
        });
    } catch (error) {
        console.error('Lỗi khi tạo admin:', error);
        return res.status(500).json({
            status: 'ERR',
            message: 'Đã xảy ra lỗi khi tạo admin'
        });
    }
};

// Lấy tất cả admin
const getAllAdmins = async (req, res) => {
    try {
        const admins = await AdminService.getAllAdmins();
        return res.status(200).json({
            status: 'OK',
            data: admins
        });
    } catch (error) {
        console.error('Lỗi khi lấy danh sách admin:', error);
        return res.status(500).json({
            status: 'ERR',
            message: 'Đã xảy ra lỗi khi lấy danh sách admin'
        });
    }
};

// Lấy admin theo id
const getAdminById = async (req, res) => {
    try {
        const { idAD } = req.params;
        const admin = await AdminService.getAdminById(idAD);

        if (!admin) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Admin không tồn tại'
            });
        }

        return res.status(200).json({
            status: 'OK',
            data: admin
        });
    } catch (error) {
        console.error('Lỗi khi lấy thông tin admin:', error);
        return res.status(500).json({
            status: 'ERR',
            message: 'Đã xảy ra lỗi khi lấy thông tin admin'
        });
    }
};

// Cập nhật admin
const updateAdmin = async (req, res) => {
    try {
        const { idAD } = req.params;
        const updatedAdmin = await AdminService.updateAdmin(idAD, req.body);

        if (!updatedAdmin) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Admin không tồn tại'
            });
        }

        return res.status(200).json({
            status: 'OK',
            message: 'Cập nhật admin thành công',
            data: updatedAdmin
        });
    } catch (error) {
        console.error('Lỗi khi cập nhật admin:', error);
        return res.status(500).json({
            status: 'ERR',
            message: 'Đã xảy ra lỗi khi cập nhật admin'
        });
    }
};

// Xóa admin
const deleteAdmin = async (req, res) => {
    try {
        const { idAD } = req.params;
        const deletedAdmin = await AdminService.deleteAdmin(idAD);

        if (!deletedAdmin) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Admin không tồn tại'
            });
        }

        return res.status(200).json({
            status: 'OK',
            message: 'Xóa admin thành công'
        });
    } catch (error) {
        console.error('Lỗi khi xóa admin:', error);
        return res.status(500).json({
            status: 'ERR',
            message: 'Đã xảy ra lỗi khi xóa admin'
        });
    }
};

module.exports = {
    createAdmin,
    getAllAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin
};
