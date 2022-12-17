var express = require('express');
var router = express.Router();

var movie = require('../controllers/MovieController.js');

// Get all movies
// router.get('/movie', movie.list);

// Get movies by name
router.get('/show/:name', movie.show);

// Create a movie
router.post('/create', movie.create);

// Delete a movie
router.post('/delete', movie.delete);

// Update a movie
//router.put('/update/:id', movie.update);
router.post('/update', movie.update);

module.exports = router;