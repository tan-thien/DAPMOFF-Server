const mongoose = require('mongoose')
const cusSchema = new mongoose.Schema({
    idCus: { type: Number, required: true, unique: true },
    nameCus: { type: String, required: true },
    addressCus: { type: String },
    sexCus: { type: String },
    phoneCus: { type: String },
    statusCus: { type: String },
    emailCus: { type: String, required: true },
    idAcc: { type: mongoose.Schema.Types.Number, ref: 'Account', required: true } // FK đến bảng Account
}, {
    timestamps: true
}
);
const Cus = mongoose.model("Cus", cusSchema);
module.exports = Cus;