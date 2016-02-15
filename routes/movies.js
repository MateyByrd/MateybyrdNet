var express = require('express');
var router = express.Router();
var MovieDatabase = require('../database/movieDatabase.js');
var mongo = require('mongodb');

var moviedb = new MovieDatabase();

var menuItems;

require('fs').readFile('./public/jsons/menuItems.json', 'utf8', function (err, data) {
  if (err) throw err; // we'll not consider error handling for now
  menuItems = JSON.parse(data);
});

router.get('/', function (req, res, next) {
  res.locals.menuItems = menuItems.menuItems;

  moviedb.GetAllMovies(function(docs) {
    console.dir(docs);
    res.render('movies', {
      pageId: 2,
      title: 'Mateybyrd.Net | Movies',
      image: '/images/movies.png',
      movies: docs
    });
  });
});

router.get('/:id', function(req, res) {
  res.locals.menuItems = menuItems.menuItems;

  var id = mongo.ObjectID(req.params.id);
  moviedb.GetMovie({ _id: id }, function(docs) {
    var data = docs[0];
    //res.send(data);
    res.render('movieDisplay', {
      pageId: 2,
      title: "Mateybyrd.Net | " + data.title,
      movie: data
    });
  });
});

module.exports = router;