const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema({
    idOrder: { type: Number, required: true, unique: true },
    statusOrd: { type: String },
    addressOrd: { type: String },
    phoneOrd: { type: String },
    bookingDate: { type: Date },
    deliveryDate: { type: Date },
    note: { type: String },
    totalPrice: { type: Number },
    idCus: { type: mongoose.Schema.Types.Number, ref: 'Cus', required: true }, // FK đến bảng Cus
    paymentMethod: { type: String } // thêm cột PaymentMethod
}, {
    timestamps: true
}
);
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
