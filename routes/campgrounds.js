var express =    require("express"),
    Campground = require("../models/campground"), 
    middleware = require("../middleware");

var router = express.Router();

// INDEX ROUTE - Show all campgrounds
router.get("/", (req, res) => {
    Campground.find({}, (err, allCampgrounds) => {
        if(err) {
            req.flash("error", err.message);
            res.redirect("back");
            return;
        }
        res.render("campgrounds/index", { campgrounds: allCampgrounds });
    });
});

// CREATE ROUTE - Add new campground to the db
router.post("/", middleware.isLoggedIn, (req, res) => {
    var author = {
        id: req.user._id,
        username: req.user.username
    };

    Campground.create(
        {name: req.body.campground.name, price: req.body.campground.price, image: req.body.campground.image, description: req.body.campground.description, author: author},
        (err, newCampground) => {
            if(err) {
                req.flash("error", err.message);
                res.redirect("back");
                return;
            }
    });

    res.redirect("/campgrounds");
});

// NEW ROUTE - Show from to create a new campground
router.get("/new", middleware.isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
});

// SHOW ROUTE - Show details of the selected campground
router.get("/:id", (req, res) => {
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
        if(err || !foundCampground){
            req.flash("error", "Campground not found");
            res.redirect("back");
            return;
        }
        res.render("campgrounds/show", { campground: foundCampground });
    });
});

// EDIT ROUTE - Show edit form
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        res.render("campgrounds/edit", { campground: foundCampground });
    });
});

// UPDATE ROUTE - Update campground
router.put("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, foundCampground) => {
        res.redirect("/campgrounds/" + req.params.id)
    });
});

// DESTROY ROUTE - Destroy campground
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err,foundCampground) => {
        foundCampground.remove((err) => {
            if(err){
                req.flash("error", err.message);
                res.redirect("back");
                return;
            }
            req.flash("success", "Campground deleted");
            res.redirect("/campgrounds");
        });
        
    });
});

module.exports = router;