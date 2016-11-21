var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

// authentication routes
//--------------------------------------


// show registration form
router.get('/register', function(req, res) {
	res.render('register');
});

// user registration
router.post('/register', function(req, res) {
	var newUserUsername = req.body.username;
	var newUser = new User({username: newUserUsername});
	User.register(newUser, req.body.password, function(err, user) {
		if(err) {
			console.log(err);
			return res.render('register');
		}
		passport.authenticate('local')(req, res, function() {
			console.log('registration successful for user', newUserUsername);
			res.redirect('/bands');
		});
	});

});

// show login form
router.get('/login', function(req, res) {
	res.render('login');
});

// user login
router.post('/login', passport.authenticate('local', {
	successRedirect: '/bands',
	failureRedirect: '/login'
}), function(req, res) {
});

// user logout
router.get('/logout', function(req, res) {
	req.logout(); // passport destroys user data in the session
	req.flash('success', 'User Logged Out!');	
	res.redirect('/bands');
});



// middleware
function isLoggedIn(req, res, next){
	if (req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
}



module.exports=  router;