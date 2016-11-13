var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// var bands = [
// 			{name: "AC/DC", image: "http://ultimateclassicrock.com/files/2012/09/ACDC-Bon-Scott.jpg"},
// 			{name: "Motorhead", image: "http://assets.vg247.com/current//2016/02/motorhead.jpg"},			
// 			{name: "Judas Priest", image: "http://crypticrock.com/wp-content/uploads/2016/04/Judas_Priest%E2%80%94Sad_Wings_of_Destiny_lineup.jpg"},
// 			{name: "Black Sabbath", image: "http://loudwire.com/files/2013/07/Black-Sabbath2.jpg"}
// 		];

mongoose.connect('mongodb://localhost/heavydb');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

// schema setup
var heavydbSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var Band = mongoose.model('Band', heavydbSchema);

app.get('/', function(req, res) {
	 res.render('start');	
});


// INDEX - display all bands
app.get('/bands', function(req, res) {
	Band.find({}, function(err, allBands){
		if (err) { 
			console.log(err);
		} else {
			res.render('index', { bands: allBands });
		}
	});	
});

// CREATE - add new band to db
app.post('/bands', function(req, res) {
	var name = req.body.name;
	var image = req.body.image;
	var newBand = {name: name, image: image};
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
	res.render('new');
});

// SHOW - shows info about one band
app.get('/bands/:id', function(req, res) {
	res.render('show')
});


app.listen(PORT, process.env.IP, function(){
    console.log('Server started on port', PORT);
});
