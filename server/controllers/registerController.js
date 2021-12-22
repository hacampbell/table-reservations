const bcrypt = require('bcrypt');
const User = require('../models/User'); 

/**
 * Registers a new user in teh database.
 * @param {*} req Data sent in the request to the server
 * @param {*} res Our response
 */
exports.RegisterUser = async (req, res) => {
    try {
        // Create hased password with salt of 10 rounds
        const hasedPass = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hasedPass
        });

        await newUser.save();
        res.status(201).json({message: 'User Created'});
    } catch (err) {
        res.status(500).json({message: 'Unable to create new user.', error: err.message});
    }
}