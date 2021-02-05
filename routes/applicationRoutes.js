const { User, validate } = require("../models/admin");
const express = require("express");
const passport = require("passport");
const router = express.Router();

//Renders index page
router.get("/", (req, res) => {
  res.render("index.ejs");
});
//Handles logot
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});
//Renders registre page
router.get("/register", (req, res) => {
  res.render("register");
});

/**
 * CREATES A NEW ADMIN ACCOUNT.
 */
router.post("/register", async (req, res) => {
  //Checks if there input is valid
  const { error } = validate(req.body);
  // If there is an error then error page is rendered with matching error
  if (error) return res.status(400).render("error", { error: error });

  // Registers new admin acc
  User.register(
    { username: req.body.username },
    req.body.password,
    function (err, use) {
      if (err) {
        console.log(err);
        res.redirect("/register");
      } else {
        passport.authenticate("local")(req, res, function () {
          res.redirect("/manage");
        });
      }
    }
  );
});

router.use((req, res) => {
  res.render("404");
});

module.exports = router;
