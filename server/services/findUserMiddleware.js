const User = require('../models/User');

/**
 * A small middleware function for finding a user in the database by their username.
 * Adds the data for said user to the res object for user in the next function.
 * @param {*} req The users request
 * @param {*} res The result
 * @param {*} next The next function to call 
 * @returns Status 404 with message user not found if no user is found.
 */
exports.GetUserByUsername = async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.username});
        if (user == null) {
            return res.status(404).json({message: "User not found"});
        }
        res.user = user;
        next();
    } catch (err) {
        res.status(500).json({message: "An error occured trying to find user", error: err.message});
    }
}