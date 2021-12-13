const express = require("express");
const router = express.Router();

// Controllers
const reservationsController = require('../controllers/reservationsController');

// Services / Middleware
// --- pending ---

// Routes
router.get('/', reservationsController.Test);


module.exports = router;