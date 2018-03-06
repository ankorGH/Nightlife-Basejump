const express = require("express");
const twitter = require("./config/passport_config");
const app = express();
const dbConnect = require("./model/connection");
const passport = require("passport");
const authRoute = require("./routes/auth");
const searchRoute = require("./routes/search");
const cookieSession = require("cookie-session");
const User = require("./model/user");

const PORT = process.env.PORT || 3000;

// cookie session
app.use(
  cookieSession({
    name: "Night-Life",
    keys: ["sanaoiunfd87sakjhjhknKJLaoklAs"],
    maxAge: 24 * 60 * 60 * 1000
  })
);

app.use(express.static(__dirname + "/public"));

// oauth
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");

app.use("/auth", authRoute);
app.use("/search", searchRoute);

app.get("/", (req, res) => {
  res.render("home", { user: req.user, searchedBars: null });
});

app.listen(PORT, () => {
  console.log(`app listening at ${PORT}`);
});
