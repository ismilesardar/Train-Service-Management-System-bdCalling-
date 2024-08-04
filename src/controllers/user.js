/**
 * Date: 17/07/2024
 * Subject: Health City 
 * Dev: Ismile Sardar
 */

const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const users = require("../models/UserModel");
const { hashPassword, comparePassword } = require("../helper/auth");

exports.CreateUser = async (req, res) => {
    try {
        // 1. destructure all fields from req.body
        const { name,
            district,
            gender,
            phone_number,
            posts_code,
            fund,
            email,
            password, } = req.body;

        // 2. all fields require validation
        if (!name.trim() || !gender.trim() || !district.trim() || !phone_number.trim() || !posts_code.trim() || !email.trim() || !password.trim()) {
            return res.status(404).json({ error: "All field is Required!" });
        }

        if (password.length < 6) {
            return res.status(404)
                .json({ error: "Password must be at least 6 characters long!" });
        }

        // 3. check if email is taken
        const existingUser = await users.findOne({ email });
        if (existingUser) {
            return res.status(404).json({ error: "E-mail is already taken!" });
        }

        // 4. hash password
        const passwordHash = await hashPassword(password);

        // 5. register user
        const newUser = await new users({
            name,
            gender,
            district,
            phone_number,
            posts_code,
            fund,
            email,
            password: passwordHash,
        }).save();


        // 7. send response
        res.status(201).json({
            user: {
                name: newUser.name,
                email: newUser.email,
                gender: newUser.gender,
                district: newUser.district,
                phone_number: newUser.phone_number,
                posts_code: newUser.posts_code,
                fund: newUser.fund,
                email: newUser.email,
            },
        });

    } catch (error) {
        return res.status(404).json({ message: "something went worn!" });
    }
};

exports.AllUserInfo = async (req, res) => {
    try {

        // find users
        const existingAdminData = await users.fine().select('-password');

        if (existingAdminData) {
            res.status(200).json(existingAdminData);
        }

    } catch (error) {
        return res.status(404).json({ message: "something went worn!" });
    }
};

exports.GetUserInfo = async (req, res) => {
    try {
        const { email } = req.body;

        // all fields require validation
        if (!email.trim()) {
            return res.status(404).json({ error: "E-mail is Required!" });
        }
        //find user
        const existingUserData = await users.findOne({ email }).select('-password');

        res.status(200).json({ ...existingUserData });

    } catch (error) {
        return res.status(404).json({ message: "something went worn!" });
    }
};

exports.LoginUser = async (req, res) => {
    try {
        // 1. destructure email, password from req.body
        const { email, password, } = req.body;

        // 2. all fields require validation
        if (!email.trim() || !password.trim()) {
            return res.status(404).json({ error: "All field is Required!" });
        }

        // 3. check if email is taken
        const existingUser = await users.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ error: "user not found!" });
        }

        // 4. compare password
        const match = await comparePassword(password, existingUser.password);
        if (!match) {
            return res.status(404).json({ error: "wrong password!" });
        }

        // 5. create signed jwt
        const token = jwt.sign({ _id: existingUser._id }, process.env.JWT_KEY, {
            expiresIn: "7d",
        });

        // 6. send response
        res.status(200).json({
            user: {
                name: existingUser.name,
                email: existingUser.email,
                gender: existingUser.gender,
                district: existingUser.district,
                phone_number: existingUser.phone_number,
                posts_code: existingUser.posts_code,
                fund: existingUser.fund,
                email: existingUser.email,
            },
            token
        });

    } catch (error) {
        return res.status(404).json({ message: "something went worn!" });
    }
};

exports.UpdateUserInfo = async (req, res) => {
    try {
        const { userId } = req.params;
        const { name, gender, district, phone_number, posts_code, fund } = req.body;

        const updateObject = {};

        if (name) updateObject.name = name;
        if (gender) updateObject.gender = gender;
        if (district) updateObject.district = district;
        if (phone_number) updateObject.phone_number = phone_number;
        if (posts_code) updateObject.posts_code = posts_code;
        if (fund) updateObject.fund = fund;

        // Update user info
        const userInfo = await users.findByIdAndUpdate({ _id: userId }, updateObject, {
            new: true
        }).select("-password");

        // send response
        res.status(201).json({ ...userInfo });

    } catch (error) {
        return res.status(404).json({ error });
    }
};

exports.TokenVerify = async (req, res) => {
    try {
        // 1. destructure Token from req.body
        const { token } = req.body;

        // 2. all fields require validation
        if (!token.trim()) {
            return res.status(404).json({ error: "Token is Required!" });
        }

        // 3. Token Verify
        let tokenVerify = jwt.verify(
            token,
            process.env.JWT_KEY
        );

        // 4. send response
        if (tokenVerify) {
            res.status(200).json({
                token,
            });
        }
    } catch (error) {
        res.status(400).json({
            message: "Token expired!",
        });
    }
};


exports.MailSender = (req, res) => {

    try {
        let { email, title, date, time } = req.body;

        const auth = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            port: 465,
            auth: {
                user: "xyz@gmail.com",
                pass: "xxx xxx xxx xxx"

            }
        });

        const receiver = {
            from: "xyz@gmail.com",
            to: email,
            subject: "User registration success!",
            text: `
        ${title}

        Thank you for join Site. I hope you enjoy your journey. Best of luck.

        Webinar Date/Time : ${date}, ${time}.
        `
        };

        auth.sendMail(receiver, (error, emailResponse) => {
            if (error) {
                throw error;
            } else {
                res.status(200).json("success");
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(404).json({ Error: error });
    }

}

