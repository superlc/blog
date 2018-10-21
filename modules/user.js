const Module = require('./module')
class User extends Module{
    constructor(params) {
        super('users', params)
    }
}

module.exports = User