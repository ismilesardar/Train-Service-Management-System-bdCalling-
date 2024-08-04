/**
 * Date: 11/07/2024
 * Subject: Health City 
 * Dev: Ismile Sardar
 */

const nodemailer = require("nodemailer");
const trains = require("../models/TrainModel");

exports.CreateTrain = async (req, res) => {
    try {
        // 1. all field get form request body
        let { stops_list, serial_no, train_name, root, bogie } = req.body;

        // 2. all fields require validation
        if (!stops_list.length || !serial_no.trim() || !train_name.trim() || !root.trim() || !bogie.trim()) {
            return res.status(404).json({ error: "All field is Required!" });
        }

        // 3. check if serial no is taken
        const existingTrain = await trains.findOne({ serial_no });
        if (existingTrain) {
            return res.status(404).json({ error: "Train is already Create!" });
        }

        // 4. create new train
        const newTrain = await new trains({
            stops_list,
            serial_no,
            train_name,
            root,
            bogie
        }).save();

        // 5. Send response
        res.status(201).json({
            ...newTrain
        });


    } catch (error) {
        return res.status(400).json({
            message: "something went worn!",
        });
    }
}

exports.UpdateTrainInfo = async (req, res) => {
    try {
        const { trainId } = req.params;

        // all field get form request body
        let { stops_list, train_name, root, bogie } = req.body;

        // New Update Object
        const updateObject = {};

        // Check any field is Empty or not
        if (stops_list.length) updateObject.stops_list = stops_list;
        if (train_name) updateObject.train_name = train_name;
        if (root) updateObject.root = root;
        if (bogie) updateObject.bogie = bogie;

        // create new train
        const newTrain = await trains.findByIdAndUpdate(trainId, updateObject, {
            new: true
        });

        // 7. Send response
        res.status(200).json({
            ...newTrain
        });


    } catch (error) {
        return res.status(400).json({
            message: "something went worn!",
        });
    }
}

exports.DeleteTrainInfo = async (req, res) => {
    try {
        const { trainId } = req.params;

        // Delete train
        const deleteTrain = await trains.findByIdAndDelete(trainId);

        // Send response
        if (deleteTrain) {
            res.status(200).json({
                ...deleteTrain
            });
        }

    } catch (error) {
        return res.status(400).json({
            message: "something went worn!",
        });
    }
}

exports.GetTrainData = async (req, res) => {
    try {
        // Get all train
        const deleteTrain = await trains.find();

        // Send response
        if (deleteTrain) {
            res.status(200).json(deleteTrain);
        }

    } catch (error) {
        return res.status(400).json({
            message: "something went worn!",
        });
    }
}

exports.SingleTrainData = async (req, res) => {
    try {
        const { trainId } = req.params;

        // Delete train
        const trainData = await trains.findById(trainId);

        // Send response
        if (trainData) {
            res.status(200).json({
                ...trainData
            });
        }

    } catch (error) {
        return res.status(400).json({
            message: "something went worn!",
        });
    }
}
