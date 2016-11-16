var mongoose = require('mongoose');

var heavydbSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var Band = mongoose.model('Band', heavydbSchema);

module.exports = Band;

