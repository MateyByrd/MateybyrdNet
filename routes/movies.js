var express = require('express');
var router = express.Router();
var MovieDatabase = require('../database/movieDatabase.js');

router.get('/', function (req, res) {
  var moviedb = new MovieDatabase();

  //moviedb.AddMovie('The Hunger Games Mockingjay part 2', 11, '20-11-2015' +
  //  ' 19:00', 'hungergames.png', 'Hunger Games', function() {});

  moviedb.GetAllMovies(function(docs) {
    res.render('movies', { pageId: 2, title: 'Mateybyrd.Net | Movies', image: '', movies: docs });
  })
});

module.exports = router;