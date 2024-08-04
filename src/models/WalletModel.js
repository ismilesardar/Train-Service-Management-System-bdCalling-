/**
 * Date: 12/08/2024
 * Subject: Train Service Management System
 * Auth: Ismile Sardar
 */

const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

// wallet Schema
const walletSchema = new mongoose.Schema({
    profile_info: {
        type: ObjectId,
        ref: "stations"
    },
    owner_id: {
        type: ObjectId,
        require: true,        
    },
    fund: {
        type: Number,
        require: true,
        trim: true,
        default: 0,
    },
}, {
    timestamps: true,
    versionKey: false
});

//create wallet model
const wallets = mongoose.model('wallets', walletSchema);

//wallet Schema exports
module.exports = wallets;