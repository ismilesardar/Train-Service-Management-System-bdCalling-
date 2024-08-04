/**
 * Date: 12/08/2024
 * Subject: Train Service Management System
 * Auth: Ismile Sardar
 */

const mongoose = require("mongoose");

// Admin Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        require: true,
    },
    gender: {
        type: String,
        trim: true,
        require: true,
    },
    district: {
        type: String,
        trim: true,
        require: true,
    },
    phone_number: {
        type: Number,
        require: true,
        trim: true,
    },
    posts_code: {
        type: Number,
        require: true,
        trim: true,
    },
    fund: {
        type: Number,
        require: true,
        trim: true,
        default: 0,
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        match: [/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, "please enter a valid emile"],
    },
    password: {
        type: String,
        required: [true, "password is Required!"],
        trim: true,
        minLength: [6, "password must be up 6"],
    },
    role: {
        type: Number,
        trim: true,
        default: 0,
    }
}, {
    timestamps: true,
    versionKey: false
});

//create user model
const users = mongoose.model('users', userSchema);

//user Schema exports
module.exports = users;