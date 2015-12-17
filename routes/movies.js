var express = require('express');
var router = express.Router();
var MovieDatabase = require('../database/movieDatabase.js');

router.get('/', function (req, res) {
  var moviedb = new MovieDatabase();
  moviedb.GetAllMovies(function(docs) {
    res.render('movies', { pageId: 2, title: 'Mateybyrd.Net | Movies', image: '/images/homepage.png', movies: docs });
  })
});

module.exports = router;