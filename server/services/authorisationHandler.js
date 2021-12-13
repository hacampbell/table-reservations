const jwt = require('jsonwebtoken');
const {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET} = require('../config/config');

/**
 * A peive of middleware for validating a user authorisation token
 * @param {*} req The user request object
 * @param {*} res Our response object
 * @param {*} next The next function to call
 */
exports.ValidateToken = (req, res, next) => {
    console.log("ValidateToken");

    const authHeader = req.headers['authorization'];        // Get auth token from request
    const token = authHeader && authHeader.split(' ')[1];   // Get rid of 'Bearer' prefix

    if (token == null) {
        return res.status(401).json({message: 'You must be logged in to perform that request.'});
    }

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({message: 'Invalid authorisation token.'});
        req.body.username = user.username;
        next();
    });
} 