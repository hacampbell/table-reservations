const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
            const accessToken = GenerateAccessToken(user.username);
            const refreshToken = GenerateRefreshToken(user.username);
            res.status(200).json({message: 'Logged in', accessToken: accessToken, refreshToken: refreshToken});
        } else {
            res.status(403).json({message: 'Incorrect password'});
        }
    } catch (err) {
        res.status(500).json({message: 'Unable to login.', error: err.message});
    }
}

/**
 * Generates a JWT access token that can be used for authorisation on requests by a
 * user. 
 * @param {string} username The username of the user to generate the access token for
 * @returns {String} A signed access token to be sent to the user to authorise future requests
 */
function GenerateAccessToken (username) {
    // Serialise user information needed for the token
    const userObj = {username: username};

    // Create the access token
    const accessToken = jwt.sign(userObj, ACCESS_TOKEN_SECRET, {expiresIn: ACCESS_TOKEN_LIFETIME});

    return accessToken;
}

/**
 * Generates a JWT refresh token that can be used to refresh an access token that has
 * expired
 * @param {String} username
 * @returns {String} A signed refresh token which can be used to refresh expired access tokens
 */
function GenerateRefreshToken (username) {
    // Serialise user information for the token
    const userObj = {username: username};

    const refreshToken = jwt.sign(userObj, REFRESH_TOKEN_SECRET);

    return refreshToken;
}