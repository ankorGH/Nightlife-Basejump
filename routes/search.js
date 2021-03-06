const GoogleMapsClient = require("../config/places_config");
const BarModel = require("../model/bar");
const UserModel = require("../model/user");
const router = require("express").Router();
const bodyParser = require("body-parser");
const { serial, parallel } = require("items-promise");

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.send("authenticate");
  } else {
    next();
  }
};

router.get("/:cityname", (req, res) => {
  let cityName = req.params.cityname;
  let bars;

  GoogleMapsClient.places(
    {
      query: "bars in " + cityName,
      type: "bars"
    },
    (err, response) => {
      if (err) throw err;
      bars = response.json.results.map(bar => {
        return {
          name: bar["name"],
          formatted_address: bar["formatted_address"],
          rating: +bar["rating"],
          place_id: bar["place_id"],
          usersAttending: []
        };
      });

      const findOrCreate = elem => {
        return new Promise(function(resolve, reject) {
          BarModel.find({ place_id: elem["place_id"] }, (err, barFound) => {
            if (err) throw err;
            if (!barFound[0]) {
              let newBar = new BarModel(elem);
              newBar.save((err, fn) => {
                resolve(fn);
              });
            } else {
              resolve(barFound[0]);
            }
          }).limit(1);
        });
      };

      parallel(bars, findOrCreate).then(allData => {
        res.send(JSON.stringify(allData));
      });
    }
  );
});

router.get("/going/:barId", authCheck, (req, res) => {
  let barId = req.params.barId;
  let userName = req.user.username;

  BarModel.findById(barId, (err, bar) => {
    if (err) throw err;
    if (bar) {
      let ind = bar["usersAttending"].findIndex(elem => {
        return elem["name"] === userName;
      });
      if (ind >= 0) {
        bar["usersAttending"].splice(ind, 1);
        bar.save((err, userSaved) => {
          if (err) throw err;
          res.send("sub");
        });
      } else {
        bar["usersAttending"].push({ name: userName });
        bar.save((err, userSaved) => {
          if (err) throw err;
          res.send("add");
        });
      }
    }
  });
});

module.exports = router;
