const express = require("express");
const router = express.Router();

// Controllers
const registerController = require('../controllers/registerController');

// Routes
router.post('/', registerController.RegisterUser);

router.get('/', registerController.Test);

module.exports = router;