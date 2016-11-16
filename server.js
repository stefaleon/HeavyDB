var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Band = require('./models/band');
var Comment = require('./models/comment');
var seedDb = require('./seeds');



//seedDb();

mongoose.connect('mongodb://localhost/heavydb');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));



app.get('/', function(req, res) {
	 res.render('start');	
});


// INDEX - display all bands
app.get('/bands', function(req, res) {
	Band.find({}, function(err, allBands){
		if (err) { 
			console.log(err);
		} else {
			res.render('bands/index', { bands: allBands });
		}
	});	
});

// CREATE - add new band to db
app.post('/bands', function(req, res) {
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
app.get('/bands/new', function(req, res) {
	res.render('bands/new');
});

// SHOW - shows info about one band
app.get('/bands/:id', function(req, res) {
	Band.findById(req.params.id).populate('comments').exec(function(err, foundBand) {
		if (err) {
			console.log(err);
		} else {
			res.render('bands/show', { band: foundBand })
		}
	});	
});



// NEW COMMENT - show form to create new comment
app.get('/bands/:id/comments/new', function(req, res) {
	Band.findById(req.params.id, function(err, foundBand) {
		if (err) {
			console.log(err);
		} else {
			res.render('comments/new', { band: foundBand })
		}
	});	
});

// CREATE COMMENT - create new comment
app.post('/bands/:id/comments', function(req, res) {
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




app.listen(PORT, process.env.IP, function(){
    console.log('Server started on port', PORT);
});
