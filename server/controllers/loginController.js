const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User'); 

const {ACCESS_TOKEN_SECRET, ACCESS_TOKEN_LIFETIME, REFRESH_TOKEN_SECRET} = require('../config/config');

/**
 * Logs a user in
 * @param {*} req Data sent in the request to the server
 * @param {*} res Our response
 */
exports.Login = async (req, res) => {
    try {
        const user = res.user;

        if (await bcrypt.compare(req.body.password, user.password)) {
            const token = GenerateJWT(user.username);
            res.status(200).json({message: 'Logged in', accessToken: token});
        } else {
            res.status(403).json({message: 'Incorrect password'});
        }
    } catch (err) {
        res.status(500).json({message: 'Unable to login.', error: err.message});
    }
}

/**
 * 
 * @param {string} username The username of the user to generate the access token for
 * @returns A signed access token to be sent to the user to authorise future requests
 */
function GenerateJWT (username) {
    // Serialise user information needed for the token
    const userObj = {'username': username};

    // Create the access token
    const accessToken = jwt.sign(userObj, ACCESS_TOKEN_SECRET, {expiresIn: ACCESS_TOKEN_LIFETIME});

    return accessToken;
}