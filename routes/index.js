var express = require('express');
var router = express.Router();
var menuItems;

require('fs').readFile('./public/jsons/menuItems.json', 'utf8', function (err, data) {
  if (err) throw err; // we'll not consider error handling for now
  menuItems = JSON.parse(data);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.locals.menuItems = menuItems.menuItems;
  res.render('index', {
    pageId: 0,
    title: 'Mateybyrd.Net | Index',
    image: '/images/frontpage.svg'
  });
});

module.exports = router;
