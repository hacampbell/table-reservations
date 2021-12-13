const express = require("express");
const router = express.Router();

// Controllers
const reservationsController = require('../controllers/reservationsController');

// Services / Middleware
const authHandler = require('../services/authorisationHandler');

// Routes
router.get('/', authHandler.ValidateToken, reservationsController.Test);


module.exports = router;