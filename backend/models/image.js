const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ImageSchema = new Schema({
    data: Buffer,
    contentType: String,
    prediction: String,
    userId: String,
}, { timestamps: true })

module.exports = mongoose.model('images', ImageSchema)