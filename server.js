var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Band = require('./models/band');
var Comment = require('./models/comment');
var seedDb = require('./seeds');

var passport = require('passport');
var LocalStrategy = require('passport-local');
var User = require('./models/user');

var bandRoutes = require('./routes/bands');
var commentRoutes = require('./routes/comments');
var authRoutes = require('./routes/auth');



//seedDb();

mongoose.connect('mongodb://localhost/heavydb');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));


// passport config
app.use(require('express-session')({
	secret: 'what is this that stands befooore mee',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// passport provides req.user, below it is passed to the templates in order to be used for ejs logic
// middleware for passing current user to all routes
app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	next();
});


// main route
app.get('/', function(req, res) {
	 res.render('start');	
});


app.use(bandRoutes);
app.use(commentRoutes);
app.use(authRoutes);


app.listen(PORT, process.env.IP, function(){
    console.log('Server started on port', PORT);
});
