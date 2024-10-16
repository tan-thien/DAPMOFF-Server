const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    idPro: { type: Number, required: true, unique: true },
    namePro: { type: String, required: true },
    imagePro: { type: String },
    descriptionPro: { type: String },
    quantityPro: { type: Number },
    colorPro: { type: String },
    pricePro: { type: Number, required: true },
    memoryPro: { type: String },
    ramPro: { type: String },
    statusPro: { type: String },
    idType: { type: mongoose.Schema.Types.Number, ref: 'TypePro', required: true }, // FK đến bảng TypePro
    idAD: { type: mongoose.Schema.Types.Number, ref: 'Admin', required: true } // FK đến bảng Admin
}, {
    timestamps: true
}
);
const Products = mongoose.model("Products", productSchema);
module.exports = Products;