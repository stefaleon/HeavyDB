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
router.post('/bands', function(req, res) {
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newBand = { name: name, image: image, description: desc };
	Band.create(newBand, function(err, newlyCreated){
		if (err) { 
			console.log(err);
		} else {
			res.redirect('/bands');
		}
	});		
});

// NEW - show form to create new band
router.get('/bands/new', function(req, res) {
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

// middleware
function isLoggedIn(req, res, next){
	if (req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
}



module.exports=  router;