const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/User'); 

/**
 * Registers a new user in teh database.
 * @param {*} req Data sent in the request to the server
 * @param {*} res Our response
 */
exports.RegisterUser = async (req, res) => {
    // TODO:    - Add middleware for data validation
    //          - Ensure that there aren't accounts already with the same email
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

/**
 * A 'Quick & Dirty' test route to get all of the users in the data base. Delete before moving
 * to production.
 * @param {*} req Data sent in the request to the server
 * @param {*} res Our response
 */
exports.Test = async (req, res) => {
    try {
        const allUsers = await User.find();
        res.status(200).json(allUsers);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}