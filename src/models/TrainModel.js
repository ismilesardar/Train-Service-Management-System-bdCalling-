/**
 * Date: 12/08/2024
 * Subject: Train Service Management System
 * Auth: Ismile Sardar
 */

const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

// Train Schema
const trainSchema = new mongoose.Schema({
    stops_list: [{
        type: ObjectId,
        ref: "stations"
    }],
    serial_no: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    train_name: {
        type: String,
        trim: true,
        required: true,
    },
    root: {
        type: String,
        trim: true,
        required: true,
    },
    bogie: {
        type: Number,
        trim: true,
        required: true,
    },

}, {
    timestamps: true,
    versionKey: false
});

// create train model
const trains = mongoose.model('trains', trainSchema);

// train Schema exports
module.exports = trains;