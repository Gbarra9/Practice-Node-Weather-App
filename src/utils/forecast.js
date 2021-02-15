const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
  console.log(latitude, longitude);

  const url = `http://api.weatherstack.com/current?access_key=API_KEY&query=${encodeURIComponent(
    latitude
  )},${encodeURIComponent(longitude)}=&units=f`;

  console.log(url);
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(`Unable to connect to weatherstack!`, undefined);
    } else if (body.error) {
      callback(
        `Invalid geocode coordinates. Please enter valid inputs.`,
        undefined
      );
    } else {
      console.log(body);
      callback(
        undefined,
        `${body.current.weather_descriptions}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees outside.`
      );
    }
  });
};

module.exports = forecast;
