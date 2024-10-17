const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema({
    idVoucher: { type: Number, required: true, unique: true },
    nameVoucher: { type: String, required: true },
    priceVoucher: { type: Number },
    statusVoucher: { type: String },
    idPro: { type: mongoose.Schema.Types.ObjectId, ref: 'Products', required: true } // FK đến bảng Pro
}, {
    timestamps: true
});

const Voucher = mongoose.model("Voucher", voucherSchema);
module.exports = Voucher;
