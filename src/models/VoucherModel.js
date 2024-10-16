const mongoose = require('mongoose')
const voucherSchema = new mongoose.Schema({
    idVoucher: { type: Number, required: true, unique: true },
    nameVoucher: { type: String, required: true },
    priceVoucher: { type: Number },
    statusVoucher: { type: String },
    idOrder: { type: mongoose.Schema.Types.Number, ref: 'Order', required: true } // FK đến bảng Order
}, {
    timestamps: true
}
);
const Voucher = mongoose.model("Voucher", voucherSchema);
module.exports = Voucher;