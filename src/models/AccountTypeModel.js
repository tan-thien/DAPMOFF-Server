const mongoose = require('mongoose')


const accountTypeSchema = new mongoose.Schema({
    idAccType: { type: Number, required: true, unique: true },
    nameType: { type: String, required: true }
}, {
    timestamps: true
}
);



const AccountType = mongoose.models.AccountType || mongoose.model("AccountType", accountTypeSchema);
module.exports = AccountType;