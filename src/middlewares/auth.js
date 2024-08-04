


const jwt = require("jsonwebtoken");
const admins = require("../models/AdminModel/AdminModel.js");

//Token verify middlewares
exports.isSigning = async (req, res, next) => {
    try {
        // console.log("process.env.JWT_KEY", process.env.JWT_KEY);
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(
            token,
            process.env.JWT_KEY
        );
       
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json(error);
    }
}

//Role verify
exports.isAdmin = async (req, res, next) => {
    try {
        const user = await admins.findById(req.user._id);
        
        if (user.role !== 1) {
            return res.status(401).json("Unauthorized");
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
    }
}
