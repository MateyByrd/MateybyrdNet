var express = require('express');
var router = express.Router();
var MovieDatabase = require('../database/movieDatabase.js');

var moviedb = new MovieDatabase();

var menuItems;

require('fs').readFile('./public/jsons/menuItems.json', 'utf8', function (err, data) {
  if (err) throw err; // we'll not consider error handling for now
  menuItems = JSON.parse(data);
});

router.get('/', function (req, res, next) {
  res.locals.menuItems = menuItems.menuItems;

  moviedb.GetAllMovies(function(docs) {
    res.render('movies', {
      pageId: 2,
      title: 'Mateybyrd.Net | Movies',
      image: '/images/movies.png',
      movies: docs
    });
  });
});

//router.get('/:movieId', function(req, res) {
//  moviedb.GetMovie({"id": req.params.id}, function(docs) {
//    res.render('movieDisplay', { pageId: 2, title: "Mateybyrd.Net | " + docs.name, movie: docs });
//  })
//});

module.exports = router;