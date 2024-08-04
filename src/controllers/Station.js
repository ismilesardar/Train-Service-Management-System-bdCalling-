/**
 * Date: 17/07/2024
 * Subject: Health City 
 * Dev: Ismile Sardar
 */

//packeg Required
const stations = require("../models/StationModel.js");

exports.CreateStation = async (req, res) => {
    try {
        // 1. destructure name, email, password from req.body
        const { serial_no, station_name, location, district, helpline_phoneNumber } = req.body;

        // 2. all fields require validation
        if (!serial_no.trim() || !station_name.trim() || !district.trim() || !location.trim() || !helpline_phoneNumber.trim()) {
            return res.status(404).json({ error: "All field is Required!" });
        }

        // 3. check if serial No is taken
        const existingStation = await stations.findOne({ serial_no });
        if (existingStation) {
            return res.status(404).json({ error: "Station is already create!" });
        }

        // 4. register Station
        const newStation = await new stations({
            serial_no,
            station_name,
            location,
            district,
            helpline_phoneNumber
        }).save();

        // 5. send response
        res.status(201).json({
            station: {
                ...newStation
            },
        });

    } catch (error) {
        return res.status(400).json({
            message: "something went worn!",
        });
    }
};

exports.StationsInfo = async (req, res) => {
    try {
        // 1. destructure station id from req.params
        const { stationId } = req.params;

        //find admin
        const stationData = await stations.findOne({ _id: stationId });

        if (stationData) {
            res.status(200).json({ ...stationData });
        }

    } catch (error) {
        return res.status(400).json({
            message: "something went worn!",
        });
    }
}

exports.AllStationData = async (req, res) => {
    try {

        // find all station data
        const stationsData = await stations.find();

        // station data send as a response
        if (stationsData) {
            res.status(200).json(stationsData);
        }

    } catch (error) {
        return res.status(400).json({
            message: "something went worn!",
        });
    }
};

exports.UpdateStation = async (req, res) => {
    try {
        const { stationId } = req.params;
        // 1. destructure name, email, password from req.body
        const { station_name, location, district, helpline_phoneNumber } = req.body;

        // New Update Object
        const updateObject = {};

        // Check any field is Empty or not
        if (station_name) updateObject.station_name = station_name;
        if (location) updateObject.location = location;
        if (district) updateObject.district = district;
        if (helpline_phoneNumber) updateObject.helpline_phoneNumber = helpline_phoneNumber;

        // find all station data and update
        const updateStationsData = await stations.findByIdAndUpdate(stationId, updateObject, {
            new: true
        });

        // station data send as a response
        if (updateStationsData) {
            res.status(200).json({ ...updateStationsData });
        }

    } catch (error) {
        return res.status(400).json({
            message: "something went worn!",
        });
    }
};

exports.DeleteStudent = async (req, res) => {
    try {
        const { stationId } = req.params;
        
        // find all station data
        const stationsData = await stations.findByIdAndDelete({_id: stationId});

        // station data send as a response
        if (stationsData) {
            res.status(200).json(stationsData);
        }

    } catch (error) {
        return res.status(400).json({
            message: "something went worn!",
        });
    }
};