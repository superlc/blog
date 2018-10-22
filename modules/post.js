const mongoose = require('mongoose')
const Schema = mongoose.Schema

const modelSymbol = Symbol()

const postSchema = new Schema({
    author: String,
    title: String,
    content: String,
    date: {
        type: Date,
        default: Date.now
    },
    comments: {
        type: Array,
        default: []
    }
});

class Post {
    constructor() {
        this[modelSymbol] = mongoose.model('Post', postSchema)
    }
    getModel() {
        return this[modelSymbol]
    }
}

module.exports = Post