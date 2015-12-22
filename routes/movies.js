var express = require('express');
var router = express.Router();
var MovieDatabase = require('../database/movieDatabase.js');

var moviedb = new MovieDatabase();

router.get('/', function (req, res) {

  //moviedb.AddMovie('The Hunger Games Mockingjay part 2', 11, '20-11-2015' +
  //  ' 19:00', 'hungergames.png', 'Hunger Games', function() {});

  moviedb.GetAllMovies(function(docs) {
    res.render('movies', { pageId: 2, title: 'Mateybyrd.Net | Movies', image: '', movies: docs });
  })
});

router.get('/:movieId', function(req, res) {
  moviedb.GetMovie({"id": req.params.id}, function(docs) {
    res.render('movieDisplay', { pageId: 2, title: "Mateybyrd.Net | " + docs.name, movie: docs });
  })
});

module.exports = router;