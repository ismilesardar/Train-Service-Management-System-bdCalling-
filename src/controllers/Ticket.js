/**
 * Date: 11/07/2024
 * Subject: Health City 
 * Dev: Ismile Sardar
 */

const tickets = require("../models/TicketeModel");
const banks = require("../models/MoneyReceiveModel");
const bookings = require("../models/BookingModel");
const wallets = require("../models/WalletModel");

exports.TripCreate = async (req, res) => {
    try {
        // 1. all field get form request body
        let { ticket_serial,
            trip_name,
            ticket_price,
            supervisor_name,
            supervisor_phone,
            bus_number,
            start_location,
            end_location,
            trip_date } = req.body;

        // 2. all fields require validation
        if (!ticket_serial.trim() || !trip_name.trim() || !ticket_price.trim() || !supervisor_name.trim() || !supervisor_phone.trim() || !bus_number.trim() || !start_location.trim() || !end_location.trim() || !trip_date.trim()) {
            return res.status(404).json({ error: "All field is Required!" });
        }

        // 3. check if serial no is taken
        const existingTickets = await tickets.findOne({ ticket_serial });
        if (existingTickets) {
            return res.status(404).json({ error: "Ticket is already Create!" });
        }

        // 4. create new tickets
        const newTickets = await new tickets({
            ticket_serial,
            trip_name,
            ticket_price,
            supervisor_name,
            supervisor_phone,
            bus_number,
            start_location,
            end_location,
            trip_date
        }).save();

        // 5. Send response
        if (newTickets) {
            res.status(201).json({
                ...newTickets
            });
        }


    } catch (error) {
        return res.status(400).json({
            message: "something went worn!",
        });
    }
}

exports.UpdateTickets = async (req, res) => {
    try {
        const { ticketId } = req.params;

        // 1. all field get form request body
        let { ticket_serial,
            trip_name,
            ticket_price,
            supervisor_name,
            supervisor_phone,
            bus_number,
            start_location,
            end_location,
            trip_date
        } = req.body;

        // new object
        let newObject = {}

        // Check field empty or not
        if (ticket_serial) newObject.ticket_serial = ticket_serial;
        if (trip_name) newObject.trip_name = trip_name;
        if (ticket_price) newObject.ticket_price = ticket_price;
        if (supervisor_name) newObject.supervisor_name = supervisor_name;
        if (supervisor_phone) newObject.supervisor_phone = supervisor_phone;
        if (bus_number) newObject.bus_number = bus_number;
        if (start_location) newObject.start_location = start_location;
        if (end_location) newObject.end_location = end_location;
        if (trip_date) newObject.trip_date = trip_date;

        // 3. check if serial no is taken
        const updateTickets = await tickets.findByIdAndUpdate({ _id: ticketId }, newObject, {
            new: true
        });

        // 4. Send response
        if (updateTickets) {
            res.status(200).json({
                ...updateTickets
            });
        }


    } catch (error) {
        return res.status(400).json({
            message: "something went worn!",
        });
    }
}

exports.AllTicketsDate = async (req, res) => {
    try {
        // find all station data
        const ticketsData = await tickets.find();

        // station data send as a response
        if (ticketsData) {
            res.status(200).json(ticketsData);
        }


    } catch (error) {
        return res.status(400).json({
            message: "something went worn!",
        });
    }
}

exports.TicketDate = async (req, res) => {
    try {
        const { ticketId } = req.params;

        // find all station data
        const ticketsData = await tickets.findById({ _id: ticketId });

        // station data send as a response
        if (ticketsData) {
            res.status(200).json(ticketsData);
        }


    } catch (error) {
        return res.status(400).json({
            message: "something went worn!",
        });
    }
}

exports.DeleteTickets = async (req, res) => {
    try {
        const { ticketId } = req.params;

        // find all station data
        const ticketsData = await tickets.findByIdAndDelete({ _id: ticketId });

        // station data send as a response
        if (ticketsData) {
            res.status(200).json(ticketsData);
        }


    } catch (error) {
        return res.status(400).json({
            message: "something went worn!",
        });
    }
}

exports.CalculatingFares = async (req, res) => {
    try {
        const { ticket_id } = req.params;

        // find all station data
        const totalFund = await banks.findById({ ticket_id });

        // station data send as a response
        if (totalFund) {
            res.status(200).json(totalFund);
        }


    } catch (error) {
        return res.status(400).json({
            message: "something went worn!",
        });
    }
}

exports.PurchasingTicket = async (req, res) => {
    try {
        const { ticketId, userID } = req.params;
        const {
            passenger_name,
            seat_number,
            passenger_phone,
            passenger_email,
            pickup_location,
            drop_location
        } = req.body;

        // check All fields
        if (!passenger_name.trim() || !seat_number.trim() || !passenger_phone.trim() || !passenger_email.trim() || !pickup_location.trim() || !drop_location.trim()) {
            return res.status(404).json({ error: "All field is Required!" });
        }

        // find all station data
        const walletData = await wallets.findById({ owner_id: userID });
        const ticketData = await tickets.findById({ _id: ticketId });

        // Fund check
        if (!walletData || walletData?.fund < ticketData?.ticket_price) {
            return res.status(400).json({ message: "Insufficient funds!" });
        } else {
            // user wallet fund update
            const walletData = await wallets.findByIdAndUpdate({ owner_id: userID }, {
                fund: walletData?.fund - ticketData?.ticket_price
            });

            if (walletData) {
                const totalFundData = await banks.findById({ ticket_id: ticketId });


                let total_fund = totalFundData ? totalFundData?.total_fund + ticketData?.ticket_price : ticketData?.ticket_price;

                const addFund = await banks.findByIdAndUpdate({ ticket_id: ticketId }, {
                    ticket_id: ticketId,
                    trip_name: ticketData?.trip_name,
                    total_fund: total_fund,
                });

                if (addFund) {
                    // create new booking
                    const newBookings = await new bookings({
                        ticket_id: ticketId,
                        trip_name: ticketData?.trip_name,
                        passenger_fares: ticketData?.ticket_price,
                        passenger_name,
                        seat_number,
                        passenger_phone,
                        passenger_email,
                        pickup_location,
                        drop_location
                    }).save();

                    // Ticket Data update
                    let available_seat = ticketData?.available_seat?.filter(item => item !== seat_number);

                    let booked_seat = [...ticketData?.booked_seat, seat_number];

                    const ticketDataUpdate = await tickets.findByIdAndUpdate({ _id: ticketId }, {
                        available_seat,
                        booked_seat
                    });

                    // station data send as a response
                    if (newBookings || ticketDataUpdate) {
                        return res.status(201).json(newBookings);
                    }
                }


            } else {
                return res.status(400).json({ message: "something went worn!" });
            }
        }


    } catch (error) {
        return res.status(400).json({
            message: "something went worn!",
        });
    }
}