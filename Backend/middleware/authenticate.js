const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const authenticateUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                message: 'No token provided'
            });
        }

        const decoded = jwt.verify(token, 'hahaha');

        const user = await userModel.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(401).json({
                message: 'User not found'
            });
        }

        req.user = user;
        next();

    } catch (error) {
        return res.status(401).json({
            message: 'Invalid token'
        });
    }
};

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: 'Access denied'
            });
        }

        next();
    };
};

module.exports = {
    authenticateUser,
    authorizeRoles
};