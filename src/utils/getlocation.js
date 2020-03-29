const rp = require("request-promise");

//getting ordinates using location name
const getLocation = (address, callBack) => {
  const mapBoxAPI = {
    uri: `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      address
    )}.json`,
    qs: {
      access_token:
        "pk.eyJ1IjoiY29vbDI0NyIsImEiOiJjazg1anZvYWUwMmx3M2htbXFxNWNjNmlwIn0.yiHpp-fXNb4W3CCm9l8VhQ",
      limit: 1
    },

    headers: {
      "User-Agent": "Request-Promise"
    },

    json: true
  };

  rp(mapBoxAPI)
    .then(function(repos) {
      if (repos.features.length == 0) {
        callBack("RESULT NOT FOUND,TRY WITH DIFFERNT SERACH TEARM", undefined);
      } else {
        callBack(undefined, {
          latitude: repos.features[0].center[0],
          longitude: repos.features[0].center[1]
        });
      }
    })
    .catch(function(err) {
      if (err.name == "RequestError") {
        callBack("unable to connect to geolocation service", undefined);
      } else {
        callBack(err.message, undefined);
      }
    });
};

module.exports = getLocation;
