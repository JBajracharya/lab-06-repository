'use strict';

const PORT = process.env.PORT || 3001;
const express = require('express');
const cors = require('cors');

const app = express();

require('dotenv').config();

app.use(cors());

app.get('/location', (request, response) => {
    // const getData = require('./data/geo.json');
    let testData = {msg: 'HELLO'};
    
    response.send(testData);
})

app.listen(PORT, () => {
    console.log(`app is up on PORT: ${PORT}`);
  });