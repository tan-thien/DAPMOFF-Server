const mongoose = require('mongoose')
const Counter = require('./Counter');

const cusSchema = new mongoose.Schema({
    idCus: { type: Number, required: true, unique: true },
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
// Middleware để tự động tăng idCus
cusSchema.pre('save', async function (next) {
    if (this.isNew) {
        const counter = await Counter.findOneAndUpdate(
            { collectionName: 'Cus' },
            { $inc: { sequenceValue: 1 } },
            { new: true, upsert: true }
        );

        this.idCus = counter.sequenceValue; // Gán giá trị ID tự động tăng
    }
    next();
});

const Cus = mongoose.models.Cus || mongoose.model("Cus", cusSchema);
module.exports = Cus;