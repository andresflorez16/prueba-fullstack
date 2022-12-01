const mongoose = require('mongoose')
const { Schema } = mongoose

const Post =  new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    user: { type: String, required: true },
    createDate: { type: Date, default: Date.now },
    likes: { type: Array } 
})

module.exports = mongoose.model('Post', Post)
