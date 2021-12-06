const express = require("express");
const router = express.Router();

// Controllers
const registerController = require('../controllers/registerController');
const loginController = require('../controllers/loginController');

// Routes
router.post('/register', registerController.RegisterUser);
router.get('/register', registerController.Test);

router.post('/login', loginController.Login);

module.exports = router;