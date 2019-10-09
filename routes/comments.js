var express =    require("express"),
    Comment =    require("../models/comment"),
    Campground = require("../models/campground"), 
    middleware = require("../middleware");

var router = express.Router({ mergeParams: true });

// NEW ROUTE (comments)
router.get("/new", middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        if(err || !foundCampground){
            req.flash("error", "Campground not found");
            res.redirect("back");
            return;
        }
        res.render("comments/new", { campground: foundCampground });
    });
});

// CREATE ROUTE (comments)
router.post("/", middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        if(err || !foundCampground){
            req.flash("error", "Campground not found");
            res.redirect("back");
            return;
        }
        Comment.create(req.body.comment, (err, createdComment) => {
            if(err){
                req.flash("error", err.message);
                res.redirect("back");
                return;
            }
            // Add user
            createdComment.author.id = req.user._id;
            createdComment.author.username = req.user.username;
            createdComment.save();
            foundCampground.comments.push(createdComment);
            foundCampground.save((err,data) =>{
                if(err){
                    req.flash("error", err.message);
                    res.redirect("back");
                    return;
                }
                req.flash("success", "Successfully added comment");
                res.redirect("/campgrounds/" + foundCampground._id);
            });
        });
    });
});

// EDIT ROUTE - Show edit form for comment
router.get("/:comment_id/edit", middleware.checkCommentOwnership, (req, res) => {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
        res.render("comments/edit", { campground_id: req.params.id, comment: foundComment });
    });
});

// UPDATE ROUTE - Update comment
router.put("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err) => {
        res.redirect("/campgrounds/" + req.params.id);
    });
});

// DESTROY ROUTE - Destroy comment
router.delete("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        if(err || !foundCampground) {
            req.flash("error", "Campground not found");
            res.redirect("back");
            return;
        }
        var comments = foundCampground.comments;
        for (var i = comments.length - 1; i>=0; i--) {
            if(comments[i]._id.equals(req.params.comment_id)){
                comments.splice(i, 1);
            }
        }

        foundCampground.save((err,data) =>{
            if(err){
                req.flash("error", err.message);
                res.redirect("back");
                return;
            }
            Comment.findByIdAndDelete(req.params.comment_id, (err, deletedComment) => {
                req.flash("success", "Comment deleted");
                res.redirect("/campgrounds/" + req.params.id);
            });
        });
    });
});

module.exports = router;