const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {ACCESS_TOKEN_SECRET, ACCESS_TOKEN_LIFETIME, REFRESH_TOKEN_SECRET} = require('../config/config');

/**
 * Logs a user in, generating accessa nd refresh tokens
 * @param {*} req 
 * @param {*} res 
 */
exports.Login = async (req, res) => {
    try {
        const user = res.user;

        // Check if the credentials are valid
        if (await bcrypt.compare(req.body.password, user.password)) {
            // Generate access and refresh tokens
            const accessToken = GenerateAccessToken(user.username);
            const refreshToken = GenerateRefreshToken(user.username);

            // Save refresh token to DB
            user.refreshToken = refreshToken;
            await user.save();

            res.status(200).json({message: 'Logged in', accessToken: accessToken, refreshToken: refreshToken});
        } else {
            res.status(403).json({message: 'Incorrect password'});
        }
    } catch (err) {
        res.status(500).json({message: 'Unable to login.', error: err.message});
    }
}

/**
 * Logs a user out by deleting their refresh token, meaning they can no longer refresh
 * access tokens.
 * @param {*} req 
 * @param {*} res 
 */
exports.Logout = async (req, res) => {
    const user = res.user;

    user.refreshToken = "";
    await user.save();

    res.status(204).json({message: 'Logged Out'});
}

/**
 * Generates a new access token given a valid refresh token
 * @param {*} req 
 * @param {*} res 
 */
exports.RefreshAccessToken = (req, res) => {
    // If we've gotten to this point we know that the refresh token in the req exists in the DB
    // and belongs to the user stored in the res.user object

    const refreshToken = req.body.refreshToken;

    // Verify the refresh token so we know it hasn't been tampered with
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({message: 'Unable to generate new access token'});

        const accessToken = GenerateAccessToken(user.username);
        res.status(200).json({accessToken: accessToken});
    });
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