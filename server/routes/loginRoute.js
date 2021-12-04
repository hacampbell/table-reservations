const express = require("express");
const router = express.Router();

// Controllers
const loginController = require('../controllers/loginController');

// Routes
router.get('/', loginController.Login);

module.exports = router;