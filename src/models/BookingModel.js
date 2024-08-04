/**
 * Date: 12/08/2024
 * Subject: Train Service Management System
 * Auth: Ismile Sardar
 */

const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

// Booking Schema
const bookingSchema = new mongoose.Schema({
    ticket_id: {
        type: ObjectId,
        ref: "tickets"
    },
    trip_name: {
        type: String,
        trim: true,
        require: true,
    },
    passenger_name: {
        type: String,
        trim: true,
        require: true,
    },
    seat_number: {
        type: String,
        trim: true,
        require: true,
        enum: [
            'A-1', 'A-2', 'A-3', 'A-4',
            'B-1', 'B-2', 'B-3', 'B-4',
            'C-1', 'C-2', 'C-3', 'C-4',
            'D-1', 'D-2', 'D-3', 'D-4',
            'E-1', 'E-2', 'E-3', 'E-4',
            'F-1', 'F-2', 'F-3', 'F-4',
            'G-1', 'G-2', 'G-3', 'G-4',
            'H-1', 'H-2', 'H-3', 'H-4',
            'I-1', 'I-2', 'I-3', 'I-4',
            'J-1', 'J-2', 'J-3', 'J-4',
        ]
    },
    passenger_phone: {
        type: String,
        trim: true,
        require: true,
    },
    passenger_fares: {
        type: Number,
        require: true,
        trim: true,
    },
    passenger_email: {
        type: String,
        trim: true,
    },
    pickup_location: {
        type: String,
        trim: true,
    },
    drop_location: {
        type: String,
        trim: true,
    },
    booking_date: {
        type: String,
        trim: true,
        default: Date.now,
    },
}, {
    timestamps: true,
    versionKey: false
});

//create booking model
const bookings = mongoose.model('bookings', bookingSchema);

//booking Schema exports
module.exports = bookings;