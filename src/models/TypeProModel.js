const mongoose = require('mongoose');
const Counter = require('./Counter');

// Schema cho TypePro
const typeProSchema = new mongoose.Schema({
    idType: { type: Number, required: true, unique: true, default: 0 },
    nameType: { type: String, required: true },
    statusType: { type: String, default: 'active' },
    imageType: { type: String },
    idCate: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, // Đổi sang ObjectId
    
}, {
    timestamps: true
});

// Middleware để tự động sinh `idType`
typeProSchema.pre('save', async function (next) {
    if (this.isNew) {
        const counter = await Counter.findOneAndUpdate(
            { name: 'typePro' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        this.idType = counter.seq;
    }
    next();
});

// Định nghĩa model
const TypePro = mongoose.model("TypePro", typeProSchema);
module.exports = TypePro;
