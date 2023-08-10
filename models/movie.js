const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema({
	title: String,
	releaseYear: Number,
	genre: String,
	director: String,
	actors: String,
	description: String,
	rating: Number,
	image: String,
});

module.exports = mongoose.model('Movie', MovieSchema);
