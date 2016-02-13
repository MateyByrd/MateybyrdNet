var express = require('express');
var router = express.Router();
var projects, menuItems;

require('fs').readFile('./public/jsons/projects.json', 'utf8', function (err, data) {
    if (err) throw err;
    projects = JSON.parse(data);
});
require('fs').readFile('./public/jsons/menuItems.json', 'utf8', function (err, data) {
  if (err) throw err;
  menuItems = JSON.parse(data);
});

router.get('/', function (req, res, next) {
  res.locals.projects = projects.projects;
  res.locals.menuItems = menuItems.menuItems;
  res.render('projects', {
    pageId: 1,
    title: 'Mateybyrd.Net | Projects',
    image: '/images/projects.svg'
  });
});

// Working on Projects
//router.get('/ARM2D2', function(req, res, next) {
//
//  require('fs').readFile('./public/jsons/projects/menuItemsARM2D2.json', 'utf-8', function (err, data) {
//    if (err) throw err;
//    var projectMenuItems = JSON.parse(data);
//
//    res.locals.menuItems = projectMenuItems.menuItems;
//    res.render('project', { title: 'Mateybyrd.Net | ARM2D2', projectName: 'ARM2D2'});
//  })
//
//});

module.exports = router;
