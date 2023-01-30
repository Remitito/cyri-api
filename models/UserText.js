const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserTextSchema = new Schema({
    language: String,
    title: String,
    text: String,
    date: Number,
    dateString: String,
    level: String,
    url: String,
    user: String,
    views: 0,
    preview: Boolean
})

module.exports = UserText = mongoose.model('UserText', UserTextSchema)