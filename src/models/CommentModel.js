const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    idComment: { type: Number, required: true, unique: true },
    comment: { type: String, required: true },
    idCus: { type: mongoose.Schema.Types.ObjectId, ref: 'Cus', required: true }, // FK đến bảng Cus
    idPro: { type: mongoose.Schema.Types.ObjectId, ref: 'Products', required: true } // FK đến bảng Order
}, {
    timestamps: true
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
