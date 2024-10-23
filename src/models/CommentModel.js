const mongoose = require('mongoose');
const Counter = require('./Counter');

const commentSchema = new mongoose.Schema({
    idComment: { type: Number, required: true, unique: true },
    comment: { type: String, required: true },
    idCus: { type: mongoose.Schema.Types.ObjectId, ref: 'Cus', required: true }, // FK đến bảng Cus
    idPro: { type: mongoose.Schema.Types.ObjectId, ref: 'Products', required: true } // FK đến bảng Order
}, {
    timestamps: true
});

// Middleware để tự động tăng idComment
commentSchema.pre('save', async function (next) {
    if (this.isNew) {
        const counter = await Counter.findOneAndUpdate(
            { collectionName: 'Comment' },
            { $inc: { sequenceValue: 1 } },
            { new: true, upsert: true }
        );

        this.idComment = counter.sequenceValue; // Gán giá trị ID tự động tăng
    }
    next();
});

const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema);
module.exports = Comment;
