var mongoose = require('mongoose');
var Band = require('./models/band');
var Comment = require('./models/comment');

var data = [
	{
		name: 'AC/DC',
		image: 'http://ultimateclassicrock.com/files/2012/09/ACDC-Bon-Scott.jpg',
		description: 'AC/DC are an Australian rock band, formed in 1973 by brothers Malcolm and Angus Young.[1] A hard rock/blues rock band,[2] they have also been considered a heavy metal band,[3][4][5][6] although they have always dubbed their music simply "rock and roll".[7]'
	},
	{
		name: 'Motorhead',
		image: 'http://assets.vg247.com/current//2016/02/motorhead.jpg',
		description: "Sunrise, wrong side of another day, Sky high and six thousand miles away, Don't know how long I've been awake, Wound up in an amazing state, Can't get enough, And you know it's righteous stuff, Goes up like prices at Christmas, Motorhead, you can call me Motorhead, alright"
	},
	{
		name: 'Judas Priest',
		image: 'https://s-media-cache-ak0.pinimg.com/originals/66/4c/47/664c47cda0f1f344d1b48a406231d4c5.jpg',
		description: 'The band Freight was formed by schoolmates Kenneth "K.K." Downing and Ian Hill in 1969. They quickly found drummer John Ellis, and decided that they needed a vocalist. In 1970, a band called Judas Priest had broken up, and Al Atkins was out of a job. He was quickly hired by Ian and K.K., who then renamed their band Judas Priest since the name was available. A demo was recorded in July, 1971, and the band opened for acts like Budgie and Slade.'
	},
	{
		name: 'Black Sabbath',
		image: 'http://loudwire.com/files/2013/07/Black-Sabbath2.jpg',
		description: 'Black Sabbath is credited with creating heavy metal. The success of their first two albums - Black Sabbath and Paranoid - marked a paradigm shift in the world of rock. Not until Black Sabbath upended the music scene did the term “heavy metal” enter the popular vocabulary to describe the denser, more thunderous offshoot of rock over which they presided. With their riff-based songs, extreme volume, and dark, demonic subject matter, Black Sabbath embodied key aspects of the heavy-metal aesthetic. Yet in their own words, Black Sabbath saw themselves as a “heavy underground” band. That term denoted both the intensity of their music and the network of fans who found them long before critics and the music industry took notice. In a sense, though they’ve sold more than 75 million albums worldwide, they still are a heavy underground band. Although they became eligible for the Rock and Roll Hall of Fame in 1995, they weren’t inducted until 2006. The truth is, they remain one of the most misunderstood bands in rock history.'
	}
];


function seedDb(){
	// remove all
	Band.remove({}, function(err) {
		if (err) {
			console.log(err);
		} else {
			console.log('bands removed!')
			// add data
			data.forEach(function (band) {
				Band.create(band, function(err, addedBand){
					if (err) { 
						console.log(err);
					} else {
						console.log(addedBand.name, "added");
						// create a comment
						Comment.create(
							{
								text: 'Great!',
								author: 'FanBoy'
							}, function (err, comment) {
								if (err) { 
									console.log(err);
								} else {
									addedBand.comments.push(comment);
									addedBand.save();	
									console.log('added a comment in ' + addedBand.name + ' listing');	
								}								
							}
						);
					}
				});	
			});
		}
	});
	

}

module.exports = seedDb;