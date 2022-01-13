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
    } catch (err) {
        return res.status(500).json({message: 'An error occured trying to get restaurant', error: err.message});
    }

    res.restaurant = restaurant;
    next();
}