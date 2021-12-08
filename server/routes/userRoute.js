const express = require("express");
const router = express.Router();

// Controllers
const registerController = require('../controllers/registerController');
const loginController = require('../controllers/loginController');

// Services / Middleware
const userFinder = require('../services/findUserMiddleware');

// Routes
router.post('/register', registerController.RegisterUser);
router.get('/register', registerController.Test);

router.post('/login', userFinder.GetUserByUsername, loginController.Login);

module.exports = router;