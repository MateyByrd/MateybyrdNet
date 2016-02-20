var express = require('express');
var router = express.Router();
var exec = require('child_process').exec
var spawn = require('child_process').spawn;

router.get('/', function(req, res, next) {
  res.render('stats');
});

router.get('/uptime', function(req, res, next) {
  exec('uptime', function(error, stdout, stderr) {
    res.send(stdout);
  });
});

router.get('/update', function(req, res, next) {
  console.log("Update was requested!");
  res.send("Updating the website... please remain calm.");
  var update = spawn('sh', ['/srv/www/updateDev.sh'], { detached: true });
});

module.exports = router;
