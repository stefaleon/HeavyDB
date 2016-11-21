var Band = require('../models/band');
var Comment = require('../models/comment');


var middlewareObj = {};


middlewareObj.isLoggedIn = function(req, res, next) {
	if (req.isAuthenticated()){
		return next();
	}
	req.flash('error', 'User must be logged in!');
	res.redirect('/login');
}



middlewareObj.checkAuthorization =  function(req, res, next) {
	// if user is authenticated (logged-in)
	if (req.isAuthenticated()){
		// find the band
		Band.findById(req.params.id, function(err, foundBand) {
			if (err) {
				req.flash('error', err);
				res.redirect('back');
			} else {
				// if current user is the creator of the band page...
				// 	if (foundBand.author.id === req.user._id) WRONG!!!!!!!!!!!!
				// we CAN NOT use === to check equality because 
				// foundBand.author.id  is a mongoose object 
				// while req.user._id is a string, so we need to 
				// use the mongoose method 'equals', SO...
				// if current user is the creator of the band page
				if (foundBand.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash('error', 'Permission denied.');
					res.redirect('back');
				}				
			}	
		});	
	} else {
		req.flash('error', 'User must be logged in!');
		res.redirect('back');
	}
} 	



middlewareObj.checkCommentAuthorization = function(req, res, next) {
	// if user is authenticated (logged-in)
	if (req.isAuthenticated()){
		// find the band
		Comment.findById(req.params.comment_id, function(err, foundComment) {
			if (err) {
				req.flash('error', err);
				res.redirect('back');
			} else {
				// if current user is the creator of the comment
				if (foundComment.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash('error', 'Permission denied.');
					res.redirect('back');
				}				
			}	
		});	
	} else {
		req.flash('error', 'User must be logged in!');
		res.redirect('back');
	}
} 	



module.exports  = middlewareObj;