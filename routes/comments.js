var express = require('express');
var router = express.Router();
var Band = require('../models/band');
var Comment = require('../models/comment');
var middleware = require('../middleware');

// NEW COMMENT - show form to create new comment
router.get('/bands/:id/comments/new', middleware.isLoggedIn, function(req, res) {
	Band.findById(req.params.id, function(err, foundBand) {
		if (err) {
			console.log(err);
		} else {
			res.render('comments/new', { band: foundBand })
		}
	});	
});

// CREATE COMMENT - create new comment
router.post('/bands/:id/comments', middleware.isLoggedIn, function(req, res) {
	Band.findById(req.params.id, function(err, foundBand) {
		if (err) { 
			console.log(err);
			req.flash('error', err);
			res.redirect('/bands');
		} else {
			Comment.create(req.body.comment, function(err, comment) {
				if (err) { 
					req.flash('error', err);
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
					req.flash('success', 'Comment Created Succesfully!');
					res.redirect('/bands/' + foundBand._id);
				}
			});
		}
	});		
});

// EDIT - show edit form for a comment
router.get('/bands/:id/comments/:comment_id/edit', middleware.checkCommentAuthorization, function(req, res) {
	Band.findById(req.params.id, function(err, foundBand) {
		if (err) {
			req.flash('error', err);
			res.redirect(back);
		} else {
			Comment.findById(req.params.comment_id, function(err, foundComment) {
				if (err) {
					req.flash('error', err);
					res.redirect(back);
				} else {
					res.render('comments/edit', { band: foundBand, comment: foundComment });
				}			
			});
		}	
	});
});

// UPDATE - update a specific comment
router.put('/bands/:id/comments/:comment_id', middleware.checkCommentAuthorization, function(req, res) {
	console.log(req.body.comment);
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
		if (err) {
			req.flash('error', 'Failed to Create Comment!');
			res.redirect(back);
		} else {
			req.flash('success', 'Comment Updated Succesfully!');			
			res.redirect('/bands/' + req.params.id);
		}	
	});
});


// DESTROY - delete a specific comment
router.delete('/bands/:id/comments/:comment_id', middleware.checkCommentAuthorization, function(req, res) {
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if (err) {
			req.flash('error', 'Failed to Remove Comment!');
			res.redirect(back);
		} else {
			req.flash('success', 'Comment Removed Succesfully!');			
			res.redirect('/bands/' + req.params.id);
		}	
	}); 
});




module.exports=  router;