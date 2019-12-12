'use strict';

const datas = [];

//dependencies
const PORT = process.env.PORT || 3040;
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
app.use(cors());

function Location (locName, formAddress, lat, long) {
    this.search_query = locName;
    this.formatted_address = formAddress 
    this.latitude = lat;
    this.longitude = long;
}

const error = {
    status: 'Error',
    responseText: 'Sorry, something went wrong',
}

app.get('/location', (request, response) => {
    
    const geoData = require('./data/geo.json');
    // console.log('1', geoData);
    let query = request.query.data;
    // console.log('queryt', query)
    const geoquery = geoData.results[0].address_components[0].long_name;
    // console.log(geoDataResult);
    const geoFormattedQuery = geoData.results[0].formatted_address;
    let lat = geoData.results[0].geometry.location.lat;    
    const lng = geoData.results[0].geometry.location.lng;
    // console.log('la', lng);
    datas.push(new Location(geoquery, geoFormattedQuery, lat, lng));

      response.send(datas[0]);
      console.log('no');
})

function Forecast(forecast, time) {
  this.forecast = forecast;
  this.time = getDate(new Date(time * 1000));
}

app.get('/weather', (request, response) => {
  const queryResult= [];
  const weatherData = require('./data/darksky.json');
  // console.log('werwr', weatherData)
  const dailyWeather = weatherData.daily.data;
  // console.log('daily', dailyWeather);
  dailyWeather.forEach(element => {
    queryResult.push(new Forecast(element.summary, element.time));
  });
  response.send(queryResult);
  
})

function getDate (time) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  let formattedDate = `${days[time.getDay()]}, ${months[time.getMonth()]} ${time.getDate()}, ${time.getFullYear()}`;
  return formattedDate;
}

app.listen(PORT, () => {
    console.log(`app is up on PORT: ${PORT}`);
  });