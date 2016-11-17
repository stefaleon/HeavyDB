var express = require('express');
var router = express.Router();
var Band = require('../models/band');
var Comment = require('../models/comment');

// NEW COMMENT - show form to create new comment
router.get('/bands/:id/comments/new', isLoggedIn, function(req, res) {
	Band.findById(req.params.id, function(err, foundBand) {
		if (err) {
			console.log(err);
		} else {
			res.render('comments/new', { band: foundBand })
		}
	});	
});

// CREATE COMMENT - create new comment
router.post('/bands/:id/comments', isLoggedIn, function(req, res) {
	Band.findById(req.params.id, function(err, foundBand) {
		if (err) { 
			console.log(err);
			res.redirect('/bands');
		} else {
			Comment.create(req.body.comment, function(err, comment) {
				if (err) { 
					console.log(err);					
				} else { 
					foundBand.comments.unshift(comment);
					foundBand.save();
					res.redirect('/bands/' + foundBand._id);
				}
			});
		}
	});		
});

// middleware
function isLoggedIn(req, res, next){
	if (req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
}


module.exports=  router;