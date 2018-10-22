const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId


const User = new Schema({
    name: String,
    role: ObjectId
});

module.exports = User