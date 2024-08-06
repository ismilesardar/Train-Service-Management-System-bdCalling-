/**
 * Date: 12/08/2024
 * Subject: Train Service Management System
 * Auth: Ismile Sardar
 */

const path = require('path');
const { readdirSync } = require('fs');

// Basic Lib Import
const express = require("express");
const app = express(); 

// Security Middleware Lib Import
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const morgan = require("morgan");
const nocache = require("nocache");
require("dotenv").config();

// Database Lib Import
const mongoose = require("mongoose");

// Security Middleware Implement
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(cors());
app.use(hpp());
app.use(morgan("dev"));
app.use(nocache());
app.use(express.static("public"));
app.use(express.json());

// Custom Middleware to Log Headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.set("Cross-Origin-Resource-Policy", "cross-origin");
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true })); // Added 'extended' option here

// Request Rate Limit
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 3000 });
app.use(limiter);

//rout middlewares
readdirSync('./src/routes').map(fill => app.use('/api/v1', require(`./src/routes/${fill}`)));

// Undefined Route Implement
app.use("*", (req, res) => {
  res.status(404).json({ status: "fail", data: "Not Found" });
});

// Mongo DB Database Connection
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Database Connected Success");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = app;
