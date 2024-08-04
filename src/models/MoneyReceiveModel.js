/**
 * Date: 12/08/2024
 * Subject: Train Service Management System
 * Auth: Ismile Sardar
 */

const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

// Bank Schema
const bankSchema = new mongoose.Schema({
    ticket_id: {
        type: ObjectId,
        ref: "tickets"
    },
    trip_name: {
        type: String,
        trim: true,
        require: true,
    },
    total_fund: {
        type: Number,
        trim: true,
        require: true,
    },
}, {
    timestamps: true,
    versionKey: false
});

//create bank model
const banks = mongoose.model('banks', bankSchema);

//bank Schema exports
module.exports = banks;