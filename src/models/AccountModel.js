const mongoose = require('mongoose');

// Model cho bộ đếm ID
const counterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    seq: { type: Number, required: true }
});

// Kiểm tra xem model đã được định nghĩa chưa
const Counter = mongoose.models.Counter || mongoose.model('Counter', counterSchema);

// Model cho Account
const accountSchema = new mongoose.Schema({
    idAcc: { type: Number, required: true, unique: true, default: 0 },
    nameAcc: { type: String, required: true },
    password: { type: String, required: true },
    dateRegister: { type: Date, default: Date.now }, // Thêm giá trị mặc định cho dateRegister
    status: { type: String },
    idAccType: { type: mongoose.Schema.Types.ObjectId, ref: 'AccountType', required: true }
}, {
    timestamps: true
});

// Middleware để tự động sinh `idAcc` trước khi lưu
accountSchema.pre('save', async function (next) {
    const account = this;

    if (account.isNew) {
        const counter = await Counter.findOneAndUpdate(
            { name: 'account' }, // Tìm bộ đếm cho bảng Account
            { $inc: { seq: 1 } }, // Tăng giá trị seq lên 1
            { new: true, upsert: true } // Tạo mới nếu chưa tồn tại
        );
        account.idAcc = counter.seq; // Gán giá trị `idAcc`
    }

    next();
});

// Middleware để xóa các bản ghi liên quan trong bảng Cus
accountSchema.pre('remove', async function(next) {
    await Cus.deleteMany({ idAcc: this.idAcc });
    next();
});

// Kiểm tra và định nghĩa model chỉ nếu nó chưa tồn tại
const Account = mongoose.models.Account || mongoose.model("Account", accountSchema);

module.exports = Account;
