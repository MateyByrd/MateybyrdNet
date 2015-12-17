/**
 * Created by nickbelzer on 16/12/15.
 */
var express = require('express');
var router = express.Router();
var movies;

require('fs').readFile('./public/jsons/movies.json', 'utf8', function (err, data) {
  if (err) throw err;
  movies = JSON.parse(data);
});

router.get('/', function (req, res, next) {
  res.locals.movies = movies;
  res.render('movies', { pageId: 2, title: 'Mateybyrd.Net | Projects'});
});