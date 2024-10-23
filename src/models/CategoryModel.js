const mongoose = require('mongoose')
const Counter = require('./Counter');

const categorySchema = new mongoose.Schema({
    idCate: { type: Number, required: true, unique: true },
    nameCate: { type: String, required: true },
    statusCate: { type: String },
    imageCate: { type: String },
    idAD: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true } // FK đến bảng Admin
}, {
    timestamps: true
}
);
// Middleware để tự động tăng idCate
categorySchema.pre('save', async function (next) {
    if (this.isNew) {
        const counter = await Counter.findOneAndUpdate(
            { collectionName: 'Category' },
            { $inc: { sequenceValue: 1 } },
            { new: true, upsert: true }
        );

        this.idCate = counter.sequenceValue; // Gán giá trị ID tự động tăng
    }
    next();
});

const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);
module.exports = Category;