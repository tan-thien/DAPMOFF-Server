const mongoose = require('mongoose')
const Counter = require('./Counter');

const accountTypeSchema = new mongoose.Schema({
    idAccType: { type: Number, required: true, unique: true },
    nameType: { type: String, required: true }
}, {
    timestamps: true
}
);

// Middleware để tự động tăng idAccType
accountTypeSchema.pre('save', async function (next) {
    if (this.isNew) {
        const counter = await Counter.findOneAndUpdate(
            { collectionName: 'AccountType' },
            { $inc: { sequenceValue: 1 } },
            { new: true, upsert: true }
        );

        this.idAccType = counter.sequenceValue; // Gán giá trị ID tự động tăng
    }
    next();
});

const AccountType = mongoose.models.AccountType || mongoose.model("AccountType", accountTypeSchema);
module.exports = AccountType;