const mongoose = require('mongoose')
const adminSchema = new mongoose.Schema({
    idAD: { type: Number, required: true, unique: true },
    nameAD: { type: String, required: true },
    role: { type: String, required: true },
    idAcc: { type: mongoose.Schema.Types.Number, ref: 'Account', required: true } // FK đến bảng Account
}, {
    timestamps: true
}
);
const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;