/**
 * Date: 17/07/2024
 * Subject: Health City 
 * Dev: Ismile Sardar
 */

const wallets = require("../models/WalletModel");

exports.CreateWallet = async (req, res) => {
    try {
        // 1. destructure all fields from req.body
        const { profile_info, owner_id, fund } = req.body;

        // 2. all fields require validation
        if (!profile_info.trim() || !owner_id.trim() || !fund.trim()) {
            return res.status(404).json({ error: "All field is Required!" });
        }

        // 5. register user
        const newWallet = await new wallets({
            profile_info,
            owner_id,
            fund,
        }).save();


        // 7. send response
        res.status(201).json({
            wallet: {
                ...newWallet
            },
        });

    } catch (error) {
        return res.status(404).json({ message: "something went worn!" });
    }
};

exports.FundAdd = async (req, res) => {
    try {
        // 1. destructure all fields from req.body
        const { profile_info, owner_id, fund } = req.body;

        // 2. all fields require validation
        if (!profile_info.trim() || !owner_id.trim() || !fund.trim()) {
            return res.status(404).json({ error: "All field is Required!" });
        }

        // 3. check if serial no is taken
        const existingWallet = await wallets.findOne({ owner_id });

        let newObject = { profile_info, owner_id, fund }

        // Check existing Wallet info
        if (existingWallet?.profile_info) newObject.profile_info = existingWallet?.profile_info
        if (existingWallet?.owner_id) newObject.owner_id = existingWallet?.owner_id
        if (existingWallet?.fund) newObject.fund = existingWallet?.fund + fund

        // 5. register user
        const newFund = await wallets.findByIdAndUpdate(owner_id, newObject, {
            new: true
        });


        // 6. send response
        res.status(201).json({
            wallet: {
                ...newFund
            },
        });

    } catch (error) {
        return res.status(404).json({ message: "something went worn!" });
    }
};

exports.RetrievingFund = async (req, res) => {
    try {
        // 1. destructure email, password from req.body
        const { owner_id } = req.params;

        // 3. check if email is taken
        const existingWallet = await users.findOne({ owner_id });
        if (!existingWallet) {
            return res.status(404).json({ error: "wallet not found!" });
        }

        // 

        // 6. send response
        res.status(200).json({
            wallet: {
                ...existingWallet
            },
        });

    } catch (error) {
        return res.status(404).json({ message: "something went worn!" });
    }
};