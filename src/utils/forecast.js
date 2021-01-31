const rp = require("request-promise");


//getting location weather report using ordinates

const forecast = ({ longitude, latitude } = {}, callback) => {
  const darkSkyAPI = {
    uri: `https://api.darksky.net/forecast/faaafe83368acb8b62172e9a9bf87202/${longitude},${latitude}?units=si`,
    headers: {
      "User-Agent": "Request-Promise"
    },
    json: true
  };

  rp(darkSkyAPI)
    .then(function(repos) {
      if (repos) {
        callback(undefined, repos);
      } else {
        callback("unable to connect", undefined);
      }
    })
    .catch(function(err) {
      callback(err.message, undefined);
    });
};

module.exports = forecast;
