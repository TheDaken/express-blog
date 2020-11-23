const mongoose = require('mongoose')
const Post = mongoose.model('post', {
    title: {
        type: String,
        required: true,
        trim: true
    },
    snippet: {
        type: String,
        required: true,
        trim: true
    },
    body: {
        type :String,
        required : true,
        trin: true
    }
})

module.exports = Respuestas