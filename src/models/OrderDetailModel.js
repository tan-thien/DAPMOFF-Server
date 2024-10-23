const mongoose = require('mongoose')
const ordDetailSchema = new mongoose.Schema({
    quantity: { type: Number, required: true },
    idPro: { type: mongoose.Schema.Types.ObjectId, ref: 'Products', required: true }, // FK đến bảng Products
    idOrder: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true }, // FK đến bảng Order
    warranty_date: { type: Date } // thêm cột Warranty_date
}, {
    timestamps: true
}
);
const OrdDetail = mongoose.model("Ord_Detail", ordDetailSchema);
module.exports = OrdDetail;