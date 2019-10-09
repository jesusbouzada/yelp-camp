var express =  require("express"),
    User =     require("../models/user"),
    passport = require("passport");

var router = express.Router();

router.get("/", (req, res) => {
    res.render("landing");
});

// Show register form
router.get("/register", (req, res) => {
    res.render("register");
});

// Sign Up
router.post("/register", (req, res) => {
    User.register(
        new User({username: req.body.username}),
        req.body.password,
        (err, user) =>
        {
            if(err) {
                req.flash("error", err.message);
                return res.render("register");
            }
            passport.authenticate("local")(req, res, () => {
                req.flash("success", "Welcome to YelpCamp " + user.username);
                res.redirect("/campgrounds");
            });
        }
    )
});

// Show login form
router.get("/login", (req, res) => {
    res.render("login");
});

// Login
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    successFlash: "Welcome back!",
    failureRedirect: "/login",
    failureFlash: "User does not exist, try again"
}), (req, res) => {});

// Logout
router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "You have been logged out!");
    res.redirect("/campgrounds");
});

module.exports = router;