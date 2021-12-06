const express = require('express');
const mongoose = require('mongoose');
const { MONGO_IP, MONGO_PORT, MONGO_USERNAME, MONGO_PASSWORD } = require("./config/config");
const app = express();

const port = process.env.PORT || 3000;

// Set up to be compatible with JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// --------------------------------------------- MongoDB ---------------------------------------------

// Database URL
const mongoDbUrl = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}`;

mongoose.connect(mongoDbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('Database Connected'))
  .catch(err => console.error( err ));

mongoose.set('useFindAndModify', false);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database!'));

// --------------------------------------------- Routing ---------------------------------------------

// Routing for /user. Breaks off into /user/login and /user/register.
const userRoute = require('./routes/userRoute');
app.use('/user', userRoute);

// 'Quick & Dirty' test route to ensure that the API is up. Remove before putting in production
app.get('/', (req, res) => {
  res.json({message: 'Hello World!'});
});

// ---------------------------------------------------------------------------------------------------

// Listen for connections to our web server.
app.listen(port, () => console.log(`Express is listening on port ${port}!`));