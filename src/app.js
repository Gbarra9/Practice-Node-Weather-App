const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const partialsPath = path.join(__dirname, '../templates/partials');
const viewsPath = path.join(__dirname, '../templates/views');

//set a value for given express value, view engine and name of module
// setup handlebars engine and view location
// Configure views to be the absolute path of templates directory
app.set('view engine', 'hbs');
app.set('views', viewsPath);

hbs.registerPartials(partialsPath);

// static takes path of folder that gets served up
// Public files if any
//Setup  static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Gene',
  });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About', name: 'Gene' });
});

app.get('/about/*', (req, res) => {
  res.render('404', {
    title: 'About ',
    errorMessage: 'About article not found',
  });
});

/*
======================================
/WEATHER
======================================
*/

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({ error: 'Please provide an address' });
  }

  // TEST GEOCODE FUNCTION CALL

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error: error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error: error });
        }

        return res.send({
          forecast: forecastData,
          location: location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get('/help', (req, res) => {
  // first param - target hbs file
  res.render('help', {
    title: 'Help',
    errorMessage: 'Help message sent! ',
    name: 'Gene',
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', { title: '404 ', errorMessage: 'Help article not found' });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({ error: 'You must provide a search term' });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Gene',
    errorMessage: '404 Page not found',
  });
});

//starting up a server is asynchronous
app.listen(3000, () => {
  console.log(`Server is up on port 3000.`);
});
