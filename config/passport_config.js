// consumer key bhHizyDvPoXV7hiFw3vLw3BKc
// consumer secret 0zFTKPJZffxQQDL4kolDm52WLddRK5vBTt83hxckqzG7XkwP3

const passport = require("passport");
const Strategy = require("passport-twitter").Strategy;
const User = require("../model/user");

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, (err, user) => {
    done(null, user);
  });
});

passport.use(
  new Strategy(
    {
      consumerKey: "bhHizyDvPoXV7hiFw3vLw3BKc",
      consumerSecret: "0zFTKPJZffxQQDL4kolDm52WLddRK5vBTt83hxckqzG7XkwP3B",
      callbackURL: "http://localhost:3000/auth/twitter/redirect"
    },
    function(token, tokenSecret, profile, done) {
      User.findOne({ twitterId: profile.id }, (err, user) => {
        if (err) throw err;
        if (!user) {
          let newUser = new User({
            username: profile["username"],
            twitterId: profile["id"]
          });
          newUser.save((err, newuser) => {
            if (err) throw err;
            console.log("new user saved");
            done(null, newuser);
          });
        } else {
          console.log("found old user");
          done(null, user);
        }
      });
    }
  )
);
