const request = require('postman-request');
require('dotenv').config().parsed;

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${
    process.env.WEATHERSTACK_API_KEY
  }&query=${encodeURIComponent(latitude)},${encodeURIComponent(
    longitude
  )}=&units=f`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(`Unable to connect to weatherstack!`, undefined);
    } else if (body.error) {
      callback(
        `Invalid geocode coordinates. Please enter valid inputs.`,
        undefined
      );
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees outside. The humidity is ${body.current.humidity}%.`
      );
    }
  });
};

module.exports = forecast;
