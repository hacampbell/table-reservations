const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    reservationName: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true,
    },

    time: {
        type: String,
        required: true,
        default: "00:00"
    },

    numGuests: {
        type: Number,
        required: true
    },

    restaurantName: {
        type: String,
        required: true
    },

    mobileNumber: {
        type: String,
        required: true
    },

    specialRequests: {
        type: String
    },

    status: {
        type: String,
        required: true,
        enum: ['Processing', 'Cancelled', 'Confirmed']
    }
});

module.exports = mongoose.model('Reservations', reservationSchema);