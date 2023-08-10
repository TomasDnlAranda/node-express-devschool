require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiVersion = process.env.API_VERSION;

const app = express();

// Configurar Header HTTP - CORS
app.use(cors());

// Importar rutas
const authRoutes = require('./router/auth');
const userRoutes = require('./router/user');
const movieRoutes = require('./router/movie');

// Configuracion Body Parse
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure static folder
app.use(express.static('uploads'));

// Configurar rutas
app.use(`/api/${apiVersion}`, authRoutes);
app.use(`/api/${apiVersion}`, userRoutes);
app.use(`/api/${apiVersion}`, movieRoutes);

module.exports = app;
