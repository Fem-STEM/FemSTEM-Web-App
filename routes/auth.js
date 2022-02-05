const express = require("express");
const router = express.Router(); // used to create a new router object
const passport = require("passport");
const User = require("../db/models/users");
const middleware = require("../middleware"); // no need of writing index .js as directory always calls index.js by default

//AUTH ROUTES
//show register form when no active session
router.get("/register", (req, res) => {
  res.redirect("/");
});
//handle sign up logic
router.post("/register", function (req, res) {
  User.register(
    new User({
      username: req.body.username,
      name: req.body.name,
      is_mentor: req.body.mentor,
      skills: req.body.skills,
      discord_id: req.body.disid,
    }),
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
        // req.flash("error",err.message); //this prints the err as error on the screen. error object has many things and err.message gives us the problem occured
        return res.redirect("/register");
      } //in these cases always use res.redirect and not res.render as in res.render we don't go through the app.get route so the middlware where we specify req.error is not utilized
      passport.authenticate("local")(req, res, function () {
        res.redirect("/");
      });
    }
  );
});

//show login form when session is inactive
router.get("/login", function (req, res) {
  res.redirect("/" + "#login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  }),
  function (req, res) {}
);

//LOGOUT
router.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

module.exports = router;
