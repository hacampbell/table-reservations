const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: () => Date.now()
    },
    refreshToken: {
        type: String,
        default: ""
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'restaurateur'],
        default: 'user'
    }
});

module.exports = mongoose.model('Users', userSchema);