const mongoose = require('mongoose');

const assessSchema = new mongoose.Schema({
    idAss: { type: Number, required: true, unique: true },
    assess: { type: String, required: true },
    idCus: { type: mongoose.Schema.Types.ObjectId, ref: 'Cus', required: true }, // FK đến bảng Cus
    idPro: { type: mongoose.Schema.Types.ObjectId, ref: 'Products', required: true } // FK đến bảng Order
}, {
    timestamps: true
});

const Assess = mongoose.model("Assess", assessSchema);
module.exports = Assess;
