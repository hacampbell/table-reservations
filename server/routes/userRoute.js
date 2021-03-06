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

router.post('/login', userFinder.GetUserByUsername, loginController.Login);

router.delete('/logout', userFinder.GetUserByRefreshToken, loginController.Logout);

router.post('/token', userFinder.GetUserByRefreshToken, loginController.RefreshAccessToken);

module.exports = router;