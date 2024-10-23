const mongoose = require('mongoose')
const Counter = require('./Counter');

// TypePro Schema
const typeProSchema = new mongoose.Schema({
    idType: { type: Number, required: true, unique: true },
    nameType: { type: String, required: true },
    imageType: { type: String },
    statusType: { type: String },
    idCate: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, // FK đến bảng Category
    idAD: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true } // FK đến bảng Admin
}, {
    timestamps: true
});

// Middleware để tự động tăng idType
typeProSchema.pre('save', async function (next) {
    if (this.isNew) {
        const counter = await Counter.findOneAndUpdate(
            { collectionName: 'TypePro' },
            { $inc: { sequenceValue: 1 } },
            { new: true, upsert: true }
        );

        this.idType = counter.sequenceValue; // Gán giá trị ID tự động tăng
    }
    next();
});

const TypePro = mongoose.models.TypePro || mongoose.model("TypePro", typeProSchema);
module.exports=TypePro;
