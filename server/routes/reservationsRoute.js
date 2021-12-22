const express = require("express");
const router = express.Router();

// Controllers
const reservationsController = require('../controllers/reservationsController');

// Services / Middleware
const authHandler = require('../services/authorisationHandler');
const userFinder = require('../services/findUserMiddleware');
const resFinder = require('../services/findReservationMiddleware');

// Routes

// Get all reservations
router.get('/', authHandler.ValidateAuthToken, userFinder.GetUserByUsername, reservationsController.GetAllReservations);

// Get single reservation by id 
router.get('/:id', authHandler.ValidateAuthToken, userFinder.GetUserByUsername, resFinder.GetReservationByID, reservationsController.GetSingleReservation);

// Create a reservation
router.post('/', authHandler.ValidateAuthToken, userFinder.GetUserByUsername, reservationsController.CreateReservation);

// Update a reservation by id
router.patch('/:id', authHandler.ValidateAuthToken, userFinder.GetUserByUsername, resFinder.GetReservationByID, reservationsController.UpdateReservation);

// Cancel a reservation by id
router.delete('/:id', authHandler.ValidateAuthToken, userFinder.GetUserByUsername, resFinder.GetReservationByID, reservationsController.CancelReservation);

module.exports = router;