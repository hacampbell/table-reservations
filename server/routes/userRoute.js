const express = require("express");
const router = express.Router();

// Controllers
const registerController = require('../controllers/registerController');
const loginController = require('../controllers/loginController');

// Services / Middleware
const userFinder = require('../services/findUserMiddleware');
const registerUserDataValidator = require('../services/registrationDataValidation');

// Routes
router.post('/register', registerUserDataValidator.ValidateNewUser, registerController.RegisterUser);
router.get('/register', registerController.Test);

router.post('/login', userFinder.GetUserByUsername, loginController.Login);

module.exports = router;