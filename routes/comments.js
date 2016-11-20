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
					// add user name and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					// save comment
					comment.save();
					// add comment to the band's comments
					foundBand.comments.unshift(comment);
					foundBand.save();
					res.redirect('/bands/' + foundBand._id);
				}
			});
		}
	});		
});

// EDIT - show edit form for a comment
router.get('/bands/:id/comments/:comment_id/edit', function(req, res) {
	Band.findById(req.params.id, function(err, foundBand) {
		if (err) {
			res.redirect(back);
		} else {
			Comment.findById(req.params.comment_id, function(err, foundComment) {
				if (err) {
					res.redirect(back);
				} else {
					res.render('comments/edit', { band: foundBand, comment: foundComment });
				}			
			});
		}	
	});
});

// UPDATE - update a specific comment
router.put('/bands/:id/comments/:comment_id', function(req, res) {
	console.log(req.body.comment);
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
		if (err) {
			res.redirect(back);
		} else {			
			res.redirect('/bands/' + req.params.id);
		}	
	});
});


// DESTROY - delete a specific comment
router.delete('/bands/:id/comments/:comment_id', function(req, res) {
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if (err) {
			res.redirect(back);
		} else {			
			res.redirect('/bands/' + req.params.id);
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