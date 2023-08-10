const Movie = require('../models/movie'); // Asegúrate de que la ruta sea correcta
const image = require('../utils/image');

async function getMovies(req, res) {
	try {
		const movies = await Movie.find();
		res.status(200).send(movies);
	} catch (error) {
		res.status(500).send({ msg: 'Error al obtener las películas' });
	}
}

async function createMovie(req, res) {
	const newMovie = new Movie(req.body);

	if (req.files.image) {
		const imagePath = image.getFileName(req.files.image);
		newMovie.image = imagePath;

		console.log(imagePath);
	}

	try {
		await newMovie.save();
		res.status(200).send({ msg: 'Película guardada' });
	} catch (error) {
		res.status(500).send({ msg: `Error al crear la película: ${error}` });
	}
}

async function updateMovie(req, res) {
	const { id } = req.params;
	const movieData = req.body;

	if (req.files.image) {
		const imagePath = image.getFileName(req.files.image);
		movieData.image = imagePath;
	}

	try {
		await Movie.findByIdAndUpdate({ _id: id }, movieData);
		res.status(200).send({ msg: 'Actualización de película exitosa' });
	} catch (error) {
		res.status(400).send({ msg: 'Error al actualizar película' });
	}
}

async function deleteMovie(req, res) {
	const { id } = req.params;

	try {
		await Movie.findByIdAndDelete(id);
		res.status(200).send({ msg: 'Película eliminada' });
	} catch (error) {
		res.status(400).send({ msg: 'Error al eliminar película' });
	}
}

module.exports = {
	getMovies,
	createMovie,
	updateMovie,
	deleteMovie,
};
