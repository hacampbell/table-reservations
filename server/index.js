const express = require('express');
const mongoose = require('mongoose');
const { MONGO_IP, MONGO_PORT, MONGO_USERNAME, MONGO_PASSWORD } = require("./config/config");
const app = express();

const port = process.env.PORT || 3000;

const mongoDbUrl = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}`;



app.get('/', (req, res) => {
  res.json({message: 'Hello World!'});
});

app.listen(port, () => console.log(`Express is listening on port ${port}!`));