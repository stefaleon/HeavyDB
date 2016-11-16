var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
	text: String,
	author: String,
	created: {
		type: Date,
		default: Date.now
	}
});

var Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;