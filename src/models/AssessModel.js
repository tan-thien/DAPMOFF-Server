const mongoose = require('mongoose')
const assessSchema = new mongoose.Schema({
    idAss: { type: Number, required: true, unique: true },
    assess: { type: String, required: true },
    idCus: { type: mongoose.Schema.Types.Number, ref: 'Cus', required: true }, // FK đến bảng Cus
    idOrder: { type: mongoose.Schema.Types.Number, ref: 'Order', required: true } // FK đến bảng Order
}, {
    timestamps: true
}
);
const Assess = mongoose.model("Assess", assessSchema);
module.exports = Assess;