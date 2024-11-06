const mongoose = require('mongoose')
const Counter = require('./Counter');

const cusSchema = new mongoose.Schema({
    nameCus: { type: String, required: true },
    addressCus: { type: String },
    sexCus: { type: String },
    phoneCus: { type: String },
    statusCus: { type: String },
    emailCus: { type: String, required: true },
    idAcc: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true } // FK đến bảng Account
}, {
    timestamps: true
}
);


const Cus = mongoose.models.Cus || mongoose.model("Cus", cusSchema);
module.exports = Cus;