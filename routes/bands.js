var express = require('express');
var router = express.Router();
var Band = require('../models/band');


// REStful routes
//--------------------------------------

// INDEX - display all bands
router.get('/bands', function(req, res) {	
	Band.find({}, function(err, allBands){
		if (err) { 
			console.log(err);
		} else {			
			res.render('bands/index', { bands: allBands });
		}
	});	
});

// CREATE - add new band to db
router.post('/bands', isLoggedIn, function(req, res) {
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newBand = { name: name, image: image, description: desc, author: author };
	Band.create(newBand, function(err, newlyCreated){
		if (err) { 
			console.log(err);
		} else {
			res.redirect('/bands');
		}
	});		
});

// NEW - show form to create new band
router.get('/bands/new', isLoggedIn, function(req, res) {
	res.render('bands/new');
});

// SHOW - shows info about one band
router.get('/bands/:id', function(req, res) {
	Band.findById(req.params.id).populate('comments').exec(function(err, foundBand) {
		if (err) {
			console.log(err);
		} else {
			res.render('bands/show', { band: foundBand })
		}
	});	
});

// EDIT - show form to edit band
router.get('/bands/:id/edit', isLoggedIn, function(req, res) {
	Band.findById(req.params.id, function(err, foundBand) {
		if (err) {
			res.redirect('/bands');
		} else {
			res.render('bands/edit', { band: foundBand });
		}	
	});	
});


// UPDATE - update a specific band
router.put('/bands/:id', isLoggedIn, function(req, res) {
	Band.findByIdAndUpdate(req.params.id, req.body.band, function(err, updatedBand) {
		if (err) {
			res.redirect('/bands');
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