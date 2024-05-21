const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    comments: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String
    },
}, { timestamps: true });

module.exports = mongoose.model('feedback', FeedbackSchema);
