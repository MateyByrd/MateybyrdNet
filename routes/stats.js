var express = require('express');
var router = express.Router();
var sys = require('util');
var exec = require('child_process').exec;
var execFile = require('child_process').execFile;

router.get('/', function(req, res, next) {
  res.render('stats');
});

router.get('/uptime', function(req, res, next) {
  exec('uptime', function(error, stdout, stderr) {
    res.send(stdout);
  });
});

router.get('/update', function(req, res, next) {
  execFile('node', ['/srv/www/updateDev.js'], function(err, stdout, stderr) {
    if (err) throw err;
    console.log(stdout);
    res.send(stdout);
  });
});

module.exports = router;
