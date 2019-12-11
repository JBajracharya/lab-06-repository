'use strict';

const datas = [];

//dependencies
const PORT = process.env.PORT || 3050;
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
app.use(cors());

function Location (locName, formAddress, lat, long) {
    this.search_query = locName;
    this.formatted_address = formAddress 
    this.lat = lat;
    this.long = long;
}

const error = {
    status: 'Error',
    responseText: 'Sorry, something went wrong',
}

app.get('/location', (request, response) => {
    
    const geoData = require('./data/geo.json');
    // console.log('1', geoData);
    let query = request.query.data;
    console.log('queryt', query)
    const geoquery = geoData.results[0].address_components[0].long_name;
    // console.log(geoDataResult);
    const geoFormattedQuery = geoData.results[0].formatted_address;
    let lat = geoData.results[0].geometry.location.lat;    
    const lng = geoData.results[0].geometry.location.lng;
    // console.log('la', lng);
    debugger;
    datas.push(new Location(geoquery, geoFormattedQuery, lat, lng));
    console.log('dtas', datas[0]);

    if(query === datas[0].search_query) {
      response.send(datas[0]);
    } else {
      response.send(error.responseText);
    }

})

app.listen(PORT, () => {
    console.log(`app is up on PORT: ${PORT}`);
  });