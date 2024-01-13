var express = require("express");
var router = express.Router();
var userModel = require("./users");
const passport = require("passport");
const localStatergy = require("passport-local");

passport.use(new localStatergy(userModel.authenticate()));

//? GET home page.
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

//? register page
router.get("/register", (req, res, next) => {
  res.render("register");
});

//? use register on register page
router.post("/register", function (req, res) {
  var newuser = new userModel({
    username: req.body.username,
    pic: req.body.pic,
  });

  //? user authentication
  userModel
    .register(newuser, req.body.password)
    .then(function (registeredUser) {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/profile");
      });
    })
    .catch((err) => {
      // res.send(err.message);
      res.send(err);
    });
});

//? login page ==> post
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "profile",
    failureRedirect: "/login",
  }),
  function (req, res) {}
);

//? login page ==> Get
router.get("/login", function (req, res, next) {
  res.render("login");
});

//? profile page
router.get("/profile", function (req, res) {
  res.render("profile");
});

module.exports = router;
