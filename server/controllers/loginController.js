const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/User'); 

/**
 * Logs a user in
 * @param {*} req Data sent in the request to the server
 * @param {*} res Our response
 */
exports.Login = async (req, res) => {
    try {
        const user = res.user;

        if (await bcrypt.compare(req.body.password, user.password)) {
            res.status(200).json({message: 'Logged in'});
        } else {
            res.status(403).json({message: 'Incorrect password'});
        }
    } catch (err) {
        res.status(500).json({message: 'Unable to login.', error: err.message});
    }
}