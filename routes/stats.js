var express = require('express');
var router = express.Router();
var sys = require('util');
var exec = require('child_process').exec;

router.get('/uptime', function(req, res, next) {
  exec('uptime', function(error, stdout, stderr) {
    res.send(stdout);
  });
});

router.get('/update', function(req, res, next) {
  exec('/srv/www/updateDev.sh', function(error, stdout, stderr) {
    res.send(stdout);
  });
});

module.exports = router;