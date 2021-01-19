const mongoose = require(`mongoose`)

const Post = mongoose.model('Post', {
    text: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 280
    },
    createdAt: {
        type : Date, 
        default : Date.now
    }
})

module.exports = Post