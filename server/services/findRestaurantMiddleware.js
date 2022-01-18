const Restaurant = require('../models/Restaurant');

/**
 * A small middleware function used to get a restaurant by a given ID and
 * add it to the res object for use in the next function.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.GetRestaurantByID = async (req, res, next) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (restaurant == null) {
            return res.status(404).json({message: 'No restaurant found'});
        }

        res.restaurant = restaurant;
    } catch (err) {
        return res.status(500).json({message: 'An error occured trying to get restaurant', error: err.message});
    }

    next();
}

/**
 * A small function for finding a restaurant by it's name
 * @param {String} name The name of the restaurant to find
 */
exports.GetRestaurantByName = async (name) => {
    try {
        // Search for a restaurant of the name we've been given
        const restaurant = await Restaurant.findOne({name: name});
        return restaurant;
    } catch (err) {
        return res.status(500).json({message: 'An error occured trying to get restaurant', error: err.message});
    }
}