const mongoose = require('mongoose');
const Counter = require('./Counter');

const voucherSchema = new mongoose.Schema({
    idVoucher: { type: Number, required: true, unique: true },
    nameVoucher: { type: String, required: true },
    priceVoucher: { type: Number },
    statusVoucher: { type: String },
    idPro: { type: mongoose.Schema.Types.ObjectId, ref: 'Products', required: true } // FK đến bảng Pro
}, {
    timestamps: true
});

// Middleware để tự động tăng idVoucher
voucherSchema.pre('save', async function (next) {
    if (this.isNew) {
        const counter = await Counter.findOneAndUpdate(
            { collectionName: 'Voucher' },
            { $inc: { sequenceValue: 1 } },
            { new: true, upsert: true }
        );

        this.idVoucher = counter.sequenceValue; // Gán giá trị ID tự động tăng
    }
    next();
});

const Voucher = mongoose.models.Voucher || mongoose.model("Voucher", voucherSchema);
module.exports = Voucher;
