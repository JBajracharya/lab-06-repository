'use strict';

const PORT = process.env.PORT || 3000;
const express = require('express');
const cors = require('cors');

const app = express();

require('dotenv').config();

app.use(cors());

function Location (locName, lat, long) {
    this.locName = locName;
    this.lat = lat;
    this.long = long;
}



app.get('/location', (request, response) => {
    
    const geoData = require('./data/geo.json');
    console.log(geoData);

    const geoDataResult = geoData.results[0].address_components[0].long_name;
    console.log(geoDataResult);

    const geoFormattedQuery = geoData.results[0].formatted_address;
    
    const lat = geoData.results[0].geometry.location.lat;

    const long = geoData.results[0].geometry.location.lng;

    response.send(lat);

    // response.send({location : {
    //     'search_query': 'seattle',
    //     'formatted_query': 'Seattle, WA, USA',
    //     'latitude': '47.606210',
    //     'longitude': '-122.332071'
    //   } });


    // response.send(getData);
    // let testData = {msg: 'HELLO'};
    
    // response.send(location);
    // const location = new Location('seattle','121212', '121211');
})

app.listen(PORT, () => {
    console.log(`app is up on PORT: ${PORT}`);
  });