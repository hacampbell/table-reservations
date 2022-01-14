const Restaurant = require('../models/Restaurant');

/**
 * Gets a list of all restaurants in the database
 * @param {*} req 
 * @param {*} res 
 */
exports.GetAllRestaurants = async (req, res) => {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
}

/**
 * Creates a new restaurant in the database
 * @param {*} req 
 * @param {*} res 
 */
exports.CreateRestaurant = async (req, res) => {
    try {
        // Make sure we secure the endpoint
        const accessList = ['admin', 'restaurateur'];

        if (!accessList.includes(res.user.role)) {
            return res.status(403).json({message: 'You cannot access this endpoint'});
        }

        // Create the new restaurant
        const newRestaurant = new Restaurant({
            owner: res.user.username,
            name: req.body.name,
            openingHours: req.body.openingHours,
            openingDays: req.body.openingDays,
            contactNumber: req.body.contactNumber,
            address: req.body.address,
            description: req.body.description,
            image: req.body.image
        });

        // Save the restraunt and notify the user 
        await newRestaurant.save();
        res.status(201).json({message: 'Restaurant created'});
    } catch (err) {
        res.status(500).json({message: 'Could not create new restaurant.', error: err.message});
    }
}

/**
 * Deletes a given restaurant in the database
 * @param {*} req 
 * @param {*} res 
 */
exports.DeleteRestaurant = async (req, res) => {
    // Make sure only admins and the owner of a restaurant can delete it
    if (res.restaurant.owner !== res.user.username && res.user.role !== 'admin') {
        return res.status(403).json({message: 'You do not have permission to perform that operation'});
    }
    
    // Delete the restaurant and notify the user
    try {
        await res.restaurant.remove();
        res.status(200).json({message: 'Restaurant deleted'});
    } catch (err) {
        res.status(500).json({message: 'An error occured trying to remove the restaurant', error: err.message});
    }
}

/**
 * Updates a given restaurant in the database
 * @param {*} req 
 * @param {*} res 
 */
exports.UpdateRestaurant = async (req, res) => {
    res.status(501).json({message: 'Implementation pending'});
}