const mongoose = require('mongoose');
const Counter = require('./Counter');

const assessSchema = new mongoose.Schema({
    idAss: { type: Number, required: true, unique: true },
    assess: { type: String, required: true },
    idCus: { type: mongoose.Schema.Types.ObjectId, ref: 'Cus', required: true }, // FK đến bảng Cus
    idPro: { type: mongoose.Schema.Types.ObjectId, ref: 'Products', required: true } // FK đến bảng Order
}, {
    timestamps: true
});

// Middleware để tự động tăng idAss
assessSchema.pre('save', async function (next) {
    if (this.isNew) {
        const counter = await Counter.findOneAndUpdate(
            { collectionName: 'Assess' },
            { $inc: { sequenceValue: 1 } },
            { new: true, upsert: true }
        );

        this.idAss = counter.sequenceValue; // Gán giá trị ID tự động tăng
    }
    next();
});

const Assess = mongoose.models.Assess || mongoose.model("Assess", assessSchema);
module.exports = Assess;
