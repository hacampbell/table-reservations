const express = require("express");
const router = express.Router();

// Controller
const restaurantController = require('../controllers/restaurantController');

// Services / Middleware
const authHandler = require('../services/authorisationHandler');
const userFinder = require('../services/findUserMiddleware');
const restaurantFinder = require('../services/findRestaurantMiddleware');

// Routes

// Get all restaurants
router.get('/', authHandler.ValidateAuthToken, userFinder.GetUserByUsername, restaurantController.GetAllRestaurants);

// Create a restaurant
router.post('/', authHandler.ValidateAuthToken, userFinder.GetUserByUsername, restaurantController.CreateRestaurant);

// Update existing restaurant
router.patch('/:id', authHandler.ValidateAuthToken, userFinder.GetUserByUsername, restaurantFinder.GetRestaurantByID, restaurantController.UpdateRestaurant);

// Delete existing restaurant
router.delete('/:id', authHandler.ValidateAuthToken, userFinder.GetUserByUsername, restaurantFinder.GetRestaurantByID, restaurantController.DeleteRestaurant);

module.exports = router;