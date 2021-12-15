const express = require("express");
const router = express.Router();

// Controllers
const reservationsController = require('../controllers/reservationsController');

// Services / Middleware
const authHandler = require('../services/authorisationHandler');
const userFinder = require('../services/findUserMiddleware');

// Routes
router.get('/', authHandler.ValidateAuthToken, userFinder.GetUserByUsername, reservationsController.Test);


module.exports = router;