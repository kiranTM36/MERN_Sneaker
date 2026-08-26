const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const authenticateUser = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

        if (!token) {
            return res.status(401).json({
                message: "Access Denied. No token provided."
            });
        }

        const decoded = jwt.verify(token,'hahaha');

        const user = await userModel.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(401).json({
                message: 'Invalid token or user no longer exists.'
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Invalid or expired token.'
        });
    }
};

module.exports = authenticateUser;