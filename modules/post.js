const Module = require('./module')
class Post extends Module{
    constructor(params) {
        super('posts', params)
    }
}

module.exports = Post