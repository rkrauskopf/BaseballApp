// app/models/video.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var VideoSchema   = new Schema({
	name: String
});

module.exports = mongoose.model('Video', VideoSchema);