const router = require("express").Router();
const passport = require("passport");

router.get("/twitter", passport.authenticate("twitter"));

router.get(
  "/twitter/redirect",
  passport.authenticate("twitter", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/");
  }
);

router.get("/signout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
