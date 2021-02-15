const request = require('postman-request');
require('dotenv').config().parsed;

const geocode = (address, callback) => {
  console.log(process.env.MAPBOX_TOKEN);
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(address) +
    '.json?access_token=' +
    process.env.MAPBOX_TOKEN +
    '&limit=1';

  request({ url, json: true }, (error, { body, statusCode }) => {
    if (error) {
      callback(`Unable to obtain geocode service!`, undefined);
    } else if (body.features.length === 0) {
      callback(
        `Unable to obtain latitude and longitude. Try another search.`,
        undefined
      );
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
