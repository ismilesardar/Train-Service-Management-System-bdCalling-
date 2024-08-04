/**
 * Date: 12/08/2024
 * Subject: Train Service Management System
 * Auth: Ismile Sardar
 */

const express = require('express');
const router = express.Router();

const { isAdmin, isSigning } = require('../middlewares/auth');
const { paymentSend } = require("../controllers/payment");
const { CreateUser, GetUserInfo, LoginUser, TokenVerify, UpdateUserInfo, MailSender, AllUserInfo } = require('../controllers/user');
const { CreateStation, StationsInfo, AllStationData, UpdateStation, DeleteStudent } = require('../controllers/Station');
const { CreateTrain, UpdateTrainInfo, DeleteTrainInfo, GetTrainData, SingleTrainData } = require('../controllers/Train');
const { CreateWallet, FundAdd, RetrievingFund } = require('../controllers/Wallet');
const { TripCreate, UpdateTickets, DeleteTickets, AllTicketsDate, TicketDate, CalculatingFares } = require('../controllers/Ticket');


// User Management
router.post('/register', CreateUser);
router.post('/login', LoginUser);
router.post('/single/user-info', isSigning, GetUserInfo);
router.get('/users-info', isSigning, isAdmin, AllUserInfo);
router.put('/update/user-info/:userId', isSigning, UpdateUserInfo);

router.post('/token/verify', TokenVerify);

// Station Management
router.post('/create-station', isSigning, isAdmin, CreateStation);
router.get('/stations-info', isSigning, isAdmin, AllStationData);
router.get('/single/station-info/:stationId', isSigning, isAdmin, StationsInfo);
router.put('/update/station-info/:stationId', isSigning, isAdmin, UpdateStation);
router.delete('/remove/station-info/:stationId', isSigning, isAdmin, DeleteStudent);

// Train Management
router.post('/create-train', isSigning, isAdmin, CreateTrain);
router.get('/trains-info', isSigning, isAdmin, GetTrainData);
router.get('/single/train-info/:trainId', isSigning, isAdmin, SingleTrainData);
router.put('/update/train-info/:trainId', isSigning, isAdmin, UpdateTrainInfo);
router.delete('/delete/train-info/:trainId', isSigning, isAdmin, DeleteTrainInfo);

// Wallet Integration
router.post('/create-wallet', isSigning, CreateWallet);
router.post('/fund-add', isSigning, FundAdd);
router.post('/fun-retrieving/:owner_id', isSigning, RetrievingFund);

// Ticketing System
router.post('/create-ticket', isSigning, isAdmin, TripCreate);
router.get('/tickets', isSigning, isAdmin, AllTicketsDate);
router.get('/single/ticket/:ticketId', isSigning, isAdmin, TicketDate);
router.put('/update-ticket/:ticketId', isSigning, isAdmin, UpdateTickets);
router.delete('/delete-ticket/:ticketId', isSigning, isAdmin, DeleteTickets);

// Purchasing Ticket

// Calculating Fares
router.get('/ticket-fund/:ticket_id', isSigning, isAdmin, CalculatingFares);

// Make Payment 
router.post('/create-payment-intent', paymentSend);

// Email Sent
router.post('/email-send-intent', MailSender);



module.exports = router;