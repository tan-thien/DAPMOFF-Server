const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
    collectionName: { type: String, required: true, unique: true },
    sequenceValue: { type: Number, default: 0 }
});

// Kiểm tra xem model đã tồn tại chưa, nếu chưa thì tạo mới
const Counter = mongoose.models.Counter || mongoose.model("Counter", counterSchema);
module.exports = Counter;
