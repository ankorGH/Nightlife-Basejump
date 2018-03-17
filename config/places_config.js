const GoogleMapsClient = require("@google/maps").createClient({
  key: process.env.MAP_KEY
});

module.exports = GoogleMapsClient;
