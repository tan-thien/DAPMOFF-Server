const mongoose = require('mongoose')


const newsSchema = new mongoose.Schema({
    idNews: { type: Number, required: true, unique: true },
    nameNews: { type: String, required: true },
    descriptionNews: { type: String },
    imageNews: { type: String },
    idAD: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true } // FK đến bảng Admin
}, {
    timestamps: true
}
);
const News = mongoose.model("News", newsSchema);
module.exports = News;
