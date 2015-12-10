var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var http = require('http');
var fs = require('fs');

// routes
var routes = require('./routes/index');
var project = require('./routes/projects');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/projects', project);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


// Testing at startup
var dev = false;
if (process.argv[2]=='dev') dev = true;

var pagesToTest = ["/", "/projects"];
var pages = pagesToTest.length;
var pagesTested = 0;

pagesToTest.forEach(function(value) {
  var request = http.get("http://localhost:3000" + value, function(res) { 
    if (res.statusCode != 200) 
      throw new Error("http://localhost:3000" + value + " contains an error");
    else 
      console.log("http://localhost:3000" + value + " has been tested correctly");

    pagesTested++;
    if (dev && pagesTested >= pages) process.exit(0);
}).on('error', function(e) 
  { 
    console.log('Error'); throw e; 
  });
});


module.exports = app;
