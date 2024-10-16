const mongoose = require('mongoose')
const commentSchema = new mongoose.Schema({
    idComment: { type: Number, required: true, unique: true },
    comment: { type: String, required: true },
    idCus: { type: mongoose.Schema.Types.Number, ref: 'Cus', required: true }, // FK đến bảng Cus
    idOrder: { type: mongoose.Schema.Types.Number, ref: 'Order', required: true } // FK đến bảng Order
}, {
    timestamps: true
}
);
const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;