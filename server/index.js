const express = require('express');
const mongoose = require('mongoose');
const { MONGO_IP, MONGO_PORT, MONGO_USERNAME, MONGO_PASSWORD } = require("./config/config");
const app = express();

const port = process.env.PORT || 3000;

// Set up to be compatible with JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Database URL
const mongoDbUrl = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}`;

// --------------------------------------------- Routing ---------------------------------------------

// Routing for login
const loginRouter = require('./routes/loginRoute');
app.use('/login', loginRouter);

// 'Quick & Dirty' test route to ensure that the API is up. Remove before putting in production
app.get('/', (req, res) => {
  res.json({message: 'Hello World!'});
});

// ---------------------------------------------------------------------------------------------------

// Listen for connections to our web server.
app.listen(port, () => console.log(`Express is listening on port ${port}!`));