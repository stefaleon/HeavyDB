var mongoose = require('mongoose');

var heavydbSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
		username: {	
			type: String,
			default: 'admin'
		}
	},
	created: {
		type: Date,
		default: Date.now
	},
	updated: Date,
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Comment'
		}
	]
});

var Band = mongoose.model('Band', heavydbSchema);

module.exports = Band;

