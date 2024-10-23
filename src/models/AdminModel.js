const mongoose = require('mongoose')
const Counter = require('./Counter');

const adminSchema = new mongoose.Schema({
    idAD: { type: Number, required: true, unique: true },
    nameAD: { type: String, required: true },
    role: { type: String, required: true },
    idAcc: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true } // FK đến bảng Account
}, {
    timestamps: true
}
);

// Middleware để tự động tăng idAD
adminSchema.pre('save', async function (next) {
    if (this.isNew) {
        const counter = await Counter.findOneAndUpdate(
            { collectionName: 'Admin' },
            { $inc: { sequenceValue: 1 } },
            { new: true, upsert: true }
        );

        this.idAD = counter.sequenceValue; // Gán giá trị ID tự động tăng
    }
    next();
});

const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);
module.exports = Admin;