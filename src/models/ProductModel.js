const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    namePro: { type: String, required: true },
    imagePro: { type: String },
    descriptionPro: { type: String },
    quantityPro: { type: Number },
    colorPro: { type: String },
    pricePro: { type: Number, required: true },
    memoryPro: { type: String },
    ramPro: { type: String },
    statusPro: { type: String },
    ngaySanXuat: { type: Date, required: true },
    baoHanh: { type: Number, required: true },
    idType: { type: mongoose.Schema.Types.ObjectId, ref: 'TypePro', required: true }
}, {
    timestamps: true
});

const Products = mongoose.models.Products || mongoose.model("Products", productSchema);
module.exports = Products;
