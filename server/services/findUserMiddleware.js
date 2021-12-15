const User = require('../models/User');

/**
 * A small middleware function for finding a user in the database by their username.
 * Adds the data for said user to the res object for use in the next function.
 * @param {*} req The users request
 * @param {*} res The result
 * @param {*} next The next function to call 
 * @returns Status 404 with message user not found if no user is found.
 */
exports.GetUserByUsername = async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.username});
        if (user == null) {
            return res.status(404).json({message: 'User not found'});
        }
        res.user = user;
        next();
    } catch (err) {
        res.status(500).json({message: 'An error occured trying to find user', error: err.message});
    }
}

/**
 * A small middleware function for finding a user in the database by their refresh
 * token. Adds the data for said user to the res object for use in the next function.
 * @param {*} req The users request
 * @param {*} res The result
 * @param {*} next The next function to call 
 * @returns Status 403 with message invalid refresh token if no matching user is found for the given refresh token.
 */
exports.GetUserByRefreshToken = async (req, res, next) => {
    // Make sure we've actually been sent a refresh token
    if (!req.body.refreshToken || req.body.refreshToken.trim() === '') {
        return res.status(400).json({message: 'No refresh token sent to server'});
    }

    // Find the user associated with the refresh token
    try {
        const user = await User.findOne({refreshToken: req.body.refreshToken});
        if (user == null) {
            return res.status(403).json({message: 'Invalid refresh token'});
        }
        res.user = user;
        next();
    } catch (err) {
        res.status(500).json({message: 'An error occured trying to find user', error: err.message});
    }
}