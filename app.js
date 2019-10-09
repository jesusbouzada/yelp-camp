var express =        require("express"),
    bodyParser =     require("body-parser"),
    mongoose =       require("mongoose"),
    methodOverride = require("method-override"),
    flash =          require("connect-flash"),
    passport =       require("passport"),
    LocalStrategy =  require("passport-local"),
    expressSession = require("express-session"),
    User =           require("./models/user"),
    seedDB =         require("./seeds");

var campgroundRoutes = require("./routes/campgrounds"),
    commentRoutes =     require("./routes/comments"),
    indexRoutes =        require("./routes/index");

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.set("view engine", "ejs");

var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp";
mongoose.connect(url, {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
//seedDB();

// Passport configuration

app.use(expressSession({
    secret: "El perro de San Roque no tiene rabo porque Ramon Ramirez se lo ha cortado",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); 

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    res.locals.gtag = process.env.GTAG;
    next();
});

// Requiring routes
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/", indexRoutes);

app.listen(process.env.PORT, process.env.IP, (req, res) => {
    console.log("The YelpCamp server has started!!")
});