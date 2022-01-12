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
    res.status(501).json({message: 'Implementation pending'});
}

/**
 * Deletes a given restaurant in the database
 * @param {*} req 
 * @param {*} res 
 */
exports.DeleteRestaurant = async (req, res) => {
    res.status(501).json({message: 'Implementation pending'});
}

/**
 * Updates a given restaurant in the database
 * @param {*} req 
 * @param {*} res 
 */
exports.UpdateRestaurant = async (req, res) => {
    res.status(501).json({message: 'Implementation pending'});
}