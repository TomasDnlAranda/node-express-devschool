const express = require('express');
const api = express.Router();
const movieController = require('../controllers/movie');

const multiparty = require('connect-multiparty');
const md_upload = multiparty({ uploadDir: './uploads/movie' });

api.get('/movies', movieController.getMovies);
api.post('/movie', [md_upload], movieController.createMovie);
api.put('/movie/:id', [md_upload], movieController.updateMovie);
api.delete('/movie/:id', movieController.deleteMovie);

module.exports = api;
