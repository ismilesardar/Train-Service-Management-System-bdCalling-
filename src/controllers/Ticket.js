/**
 * Date: 11/07/2024
 * Subject: Health City 
 * Dev: Ismile Sardar
 */

const tickets = require("../models/TicketeModel");

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