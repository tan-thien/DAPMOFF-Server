const mongoose = require('mongoose');

// Model cho Category
const categorySchema = new mongoose.Schema({
    idCate: { type: Number, required: true, unique: true, default: 0 },
    nameCate: { type: String, required: true },
    status: { type: String, default: 'active' },
    imageCate: { type: String },
    
}, {
    timestamps: true
});

// Middleware để tự động sinh `idCate`
categorySchema.pre('save', async function (next) {
    const category = this;

    if (category.isNew) {
        // Tìm bộ đếm cho Category và tăng giá trị seq lên 1
        const counter = await Counter.findOneAndUpdate(
            { name: 'category' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        category.idCate = counter.seq; // Gán giá trị `idCate`
    }

    next();
});

// Định nghĩa model
const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);

module.exports = Category;

// Model cho bộ đếm ID
const counterSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    seq: { type: Number, required: true }
});

// Kiểm tra xem model đã được định nghĩa chưa
const Counter = mongoose.models.Counter || mongoose.model('Counter', counterSchema);

module.exports.Counter = Counter;
