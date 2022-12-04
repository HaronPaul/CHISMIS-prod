const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true  
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        enum: [1999, 2121, 2699]
    },
    verified: {
        type: Boolean,
        default: false
    },
    refreshToken: {
        type: String,
    }
})


module.exports = User = mongoose.model('user', UserSchema)
