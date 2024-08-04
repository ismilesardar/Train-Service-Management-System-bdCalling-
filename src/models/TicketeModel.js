/**
 * Date: 12/08/2024
 * Subject: Train Service Management System
 * Auth: Ismile Sardar
 */

const mongoose = require("mongoose");

// Ticket Schema
const ticketSchema = new mongoose.Schema({
    ticket_serial: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    trip_name: {
        type: String,
        trim: true,
        required: true,
    },
    supervisor_name: {
        type: String,
        trim: true,
        required: true,
    },
    supervisor_phone: {
        type: Number,
        trim: true,
        required: true,
    },
    bus_number: {
        type: String,
        trim: true,
        required: true,
    },
    start_location: {
        type: String,
        trim: true,
        required: true,
    },
    end_location: {
        type: String,
        trim: true,
        required: true,
    },
    trip_date: {
        type: Date,
        trim: true,
        required: true,
    },
    issue_date: {
        type: Date,
        trim: true,
        required: true,
    },
    total_seat: {
        type: Array,
        trim: true,
        required: true,
        default: [
            'A-1','A-2','A-3','A-4',
            'B-1','B-2','B-3','B-4',
            'C-1','C-2','C-3','C-4',
            'D-1','D-2','D-3','D-4',
            'E-1','E-2','E-3','E-4',
            'F-1','F-2','F-3','F-4',
            'G-1','G-2','G-3','G-4',
            'H-1','H-2','H-3','H-4',
            'I-1','I-2','I-3','I-4',
            'J-1','J-2','J-3','J-4',
        ]
    },
    booked_seat: {
        type: Array,
        trim: true,
        required: true,
        default: []
    },
    available_seat: {
        type: Array,
        trim: true,
        required: true,
        default: [
            'A-1','A-2','A-3','A-4',
            'B-1','B-2','B-3','B-4',
            'C-1','C-2','C-3','C-4',
            'D-1','D-2','D-3','D-4',
            'E-1','E-2','E-3','E-4',
            'F-1','F-2','F-3','F-4',
            'G-1','G-2','G-3','G-4',
            'H-1','H-2','H-3','H-4',
            'I-1','I-2','I-3','I-4',
            'J-1','J-2','J-3','J-4',
        ]
    },
    
}, {
    timestamps: true,
    versionKey: false
});

//create ticket model
const tickets = mongoose.model('tickets', ticketSchema);

//ticket Schema exports
module.exports = tickets;