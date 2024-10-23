const mongoose = require('mongoose')
const Counter = require('./Counter');

const orderSchema = new mongoose.Schema({
    idOrder: { type: Number, required: true, unique: true },
    statusOrd: { type: String },
    addressOrd: { type: String },
    phoneOrd: { type: String },
    bookingDate: { type: Date },
    deliveryDate: { type: Date },
    note: { type: String },
    totalPrice: { type: Number },
    idCus: { type: mongoose.Schema.Types.ObjectId, ref: 'Cus', required: true }, // FK đến bảng Cus
    paymentMethod: { type: String } // thêm cột PaymentMethod
}, {
    timestamps: true
}
);

// Middleware để tự động tăng idOrder
orderSchema.pre('save', async function (next) {
    if (this.isNew) {
        const counter = await Counter.findOneAndUpdate(
            { collectionName: 'Order' },
            { $inc: { sequenceValue: 1 } },
            { new: true, upsert: true }
        );

        this.idOrder = counter.sequenceValue; // Gán giá trị ID tự động tăng
    }
    next();
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
module.exports = Order;
