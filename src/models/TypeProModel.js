const mongoose = require('mongoose')
// TypePro Schema
const typeProSchema = new mongoose.Schema({
    idType: { type: Number, required: true, unique: true },
    nameType: { type: String, required: true },
    imageType: { type: String },
    statusType: { type: String },
    idCate: { type: mongoose.Schema.Types.Number, ref: 'Category', required: true }, // FK đến bảng Category
    idAD: { type: mongoose.Schema.Types.Number, ref: 'Admin', required: true } // FK đến bảng Admin
}, {
    timestamps: true
});
const TypePro = mongoose.model("TypePro", typeProSchema);
module.exports=TypePro;
