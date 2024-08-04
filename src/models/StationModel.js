/**
 * Date: 12/08/2024
 * Subject: Train Service Management System
 * Auth: Ismile Sardar
 */

const mongoose = require("mongoose");

// Station Schema
const stationSchema = new mongoose.Schema({
    serial_no: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    station_name: {
        type: String,
        trim: true,
        required: true,
    },
    location: {
        type: String,
        trim: true,
        required: true,
    },
    district: {
        type: String,
        trim: true,
        required: true,
    },
    helpline_phoneNumber: {
        type: Number,
        trim: true,
        required: true,
    },
}, {
    timestamps: true,
    versionKey: false
});

//create station model
const stations = mongoose.model('stations', stationSchema);

//station Schema exports
module.exports = stations;