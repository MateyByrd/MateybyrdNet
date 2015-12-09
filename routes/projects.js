var express = require('express');
var router = express.Router();
var path = require('path');
var projects, menuItems;

require('fs').readFile('./routes/projects.json', 'utf8', function (err, data) {
    if (err) throw err; // we'll not consider error handling for now
    projects = JSON.parse(data);
});
require('fs').readFile('./routes/menuItems.json', 'utf8', function (err, data) {
  if (err) throw err; // we'll not consider error handling for now
  menuItems = JSON.parse(data);
});

router.get('/', function (req, res, next) {
  res.locals.projects = projects.projects;
  res.locals.menuItems = menuItems.menuItems;
  res.render('projects', { pageId: 1, title: 'Mateybyrd.Net | Projects', image: '/images/projects.png' });
});

module.exports = router;
