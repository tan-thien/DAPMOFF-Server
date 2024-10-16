const Account = require("../models/AccountModel");
const Cus = require('../models/CusModel');
const bcrypt =require("bcryptjs");
const { genneralAccessToken, genneralRefreshToken } = require('./JwtService');


const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { nameAcc, password, idAccType, status } = newUser;

        try {
            // Kiểm tra xem tên tài khoản đã tồn tại hay chưa
            const checkUser = await Account.findOne({ nameAcc: nameAcc });
            if (checkUser !== null) {
                return resolve({
                    status: 'ERR',
                    message: 'Tên tài khoản đã tồn tại'
                });
            }

            // Mã hóa mật khẩu
            const hash = bcrypt.hashSync(password, 10);

            // Tạo tài khoản mới
            const createdUser = await Account.create({
                nameAcc, 
                password: hash, 
                idAccType,
                status: status || 'active',  // Mặc định là 'active' nếu không cung cấp
                dateRegister: new Date()     // Lưu ngày đăng ký hiện tại
            });

            if (createdUser) {
                resolve({
                    status: 'OK',
                    message: 'Tạo tài khoản thành công',
                    data: createdUser
                });
            } else {
                resolve({ status: 'ERR', message: 'Tạo tài khoản thất bại' });
            }

        } catch (e) {
            reject({
                status: 'ERR',
                message: e.message
            });
        }
    });
};

const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { nameAcc, password } = userLogin;

        try {
            // Kiểm tra xem người dùng có tồn tại không
            const checkUser = await Account.findOne({ nameAcc: nameAcc });
            
            if (checkUser === null) {
                return resolve({
                    status: 'error',
                    message: 'Tên tài khoản không tồn tại'
                });
            }

            // So sánh mật khẩu
            const comparePassword = bcrypt.compareSync(password, checkUser.password);
            if (!comparePassword) {
                return resolve({
                    status: 'error',
                    message: 'Tài khoản hoặc mật khẩu không đúng',
                });
            }

            // Tạo access token
            const access_token = genneralAccessToken({
                id: checkUser.idAcc,
                isAdmin: checkUser.idAccType
            });

            const Refresh_token = genneralRefreshToken({
                id: checkUser.idAcc,
                isAdmin: checkUser.idAccType
            });

            // Gửi phản hồi thành công kèm theo token
            return resolve({ status: 'OK', message: 'Success', data: checkUser, access_token, Refresh_token });

        } catch (e) {
            // Ghi log lỗi để dễ dàng kiểm tra
            console.error('Lỗi trong quá trình đăng nhập:', e);
            return reject({
                status: 'error',
                message: 'Đã xảy ra lỗi trong quá trình đăng nhập',
            });
        }
    });
};

// Cập nhật tài khoản
const updateUser = async (idAcc, updateData) => {
    try {
        const updatedAccount = await Account.findOneAndUpdate(
            { idAcc: idAcc }, 
            updateData, 
            { new: true }
        );
        return updatedAccount;
    } catch (error) {
        console.error('Lỗi khi cập nhật tài khoản:', error);
        throw error;
    }
};

// Cập nhật thông tin khách hàng (Cus)
const updateCus = async (idCus, updateData) => {
    try {
        const updatedCus = await Cus.findOneAndUpdate(
            { idCus: idCus },
            { 
                nameCus: updateData.nameCus,
                addressCus: updateData.addressCus,
                phoneCus: updateData.phoneCus
            }, 
            { new: true }
        );
        return updatedCus;
    } catch (error) {
        console.error('Lỗi khi cập nhật thông tin khách hàng:', error);
        throw error;
    }
};

const deleteUser = async (idAcc) => {
    try {
        // Tìm và xóa tài khoản theo idAcc
        const deletedAccount = await Account.findOneAndDelete({ idAcc: idAcc });

        if (!deletedAccount) {
            return null; // Không tìm thấy tài khoản để xóa
        }

        // Xóa các thông tin liên quan đến tài khoản trong bảng Cus
        await Cus.deleteMany({ idAcc: idAcc });

        return deletedAccount; // Trả về tài khoản đã bị xóa
    } catch (error) {
        console.error('Lỗi khi xóa tài khoản:', error);
        throw new Error('Lỗi khi xóa tài khoản');
    }
};

const getUserById = async (idAcc) => {
    try {
        // Tìm thông tin tài khoản theo idAcc, bao gồm cả thông tin Cus liên quan (nếu có)
        const user = await Account.findOne({ idAcc: idAcc }).populate('idAccType');

        if (!user) {
            return null; // Trả về null nếu không tìm thấy người dùng
        }

        // Tìm thêm thông tin Cus liên quan nếu cần
        const customerInfo = await Cus.findOne({ idAcc: idAcc });

        return {
            ...user.toObject(), // Trả về thông tin tài khoản
            customerInfo // Thêm thông tin Cus nếu có
        };
    } catch (error) {
        console.error('Lỗi khi lấy thông tin tài khoản:', error);
        throw new Error('Lỗi khi lấy thông tin tài khoản');
    }
};

module.exports = {
    createUser,
    loginUser,
    updateUser,
    updateCus,
    deleteUser,
    getUserById
};
