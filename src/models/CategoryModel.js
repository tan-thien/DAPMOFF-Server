const mongoose = require('mongoose')
const categorySchema = new mongoose.Schema({
    idCate: { type: Number, required: true, unique: true },
    nameCate: { type: String, required: true },
    statusCate: { type: String },
    imageCate: { type: String },
    idAD: { type: mongoose.Schema.Types.Number, ref: 'Admin', required: true } // FK đến bảng Admin
}, {
    timestamps: true
}
);
const Category = mongoose.model("Category", categorySchema);
module.exports = Category;