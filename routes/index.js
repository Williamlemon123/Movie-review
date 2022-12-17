var express = require("express");
var router = express.Router();
var movie = require('../controllers/MovieController.js');
// Get all movies
router.get('/', movie.list);

module.exports = router;
