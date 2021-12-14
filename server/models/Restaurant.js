const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    openingHours: {
        type: String,
        required: true
    },
    openingDays: {
        type: String,
        required: true
    },
    contactNumber: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: () => Date.now()
    }

});

module.exports = mongoose.model('Users', restaurantSchema);