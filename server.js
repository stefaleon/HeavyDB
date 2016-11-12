var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var bodyParser = require('body-parser');


var bands = [
			{name: "AC/DC", image: "http://ultimateclassicrock.com/files/2012/09/ACDC-Bon-Scott.jpg"},
			{name: "Motorhead", image: "http://assets.vg247.com/current//2016/02/motorhead.jpg"},			
			{name: "Judas Priest", image: "http://crypticrock.com/wp-content/uploads/2016/04/Judas_Priest%E2%80%94Sad_Wings_of_Destiny_lineup.jpg"},
			{name: "Black Sabbath", image: "http://loudwire.com/files/2013/07/Black-Sabbath2.jpg"},
			{name: "AC/DC", image: "http://ultimateclassicrock.com/files/2012/09/ACDC-Bon-Scott.jpg"},
			{name: "Motorhead", image: "http://assets.vg247.com/current//2016/02/motorhead.jpg"},			
			{name: "Judas Priest", image: "http://crypticrock.com/wp-content/uploads/2016/04/Judas_Priest%E2%80%94Sad_Wings_of_Destiny_lineup.jpg"},
			{name: "Black Sabbath", image: "http://loudwire.com/files/2013/07/Black-Sabbath2.jpg"},
			{name: "AC/DC", image: "http://ultimateclassicrock.com/files/2012/09/ACDC-Bon-Scott.jpg"},
			{name: "Motorhead", image: "http://assets.vg247.com/current//2016/02/motorhead.jpg"},			
			{name: "Judas Priest", image: "http://crypticrock.com/wp-content/uploads/2016/04/Judas_Priest%E2%80%94Sad_Wings_of_Destiny_lineup.jpg"},
			{name: "Black Sabbath", image: "http://loudwire.com/files/2013/07/Black-Sabbath2.jpg"}
			

		];

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
	 res.render('index');	
});

app.get('/bands', function(req, res) {
	
	res.render('bands', { bands: bands });
});

app.post('/bands', function(req, res) {
	var name = req.body.name;
	var image = req.body.image;
	var newBand = {name: name, image: image};
	bands.push(newBand);
	res.redirect('/bands');
});

app.get('/bands/new', function(req, res) {
	res.render('new');
});

app.listen(PORT, process.env.IP, function(){
    console.log('Server started on port', PORT);
});
