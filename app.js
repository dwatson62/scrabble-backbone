require('dotenv').config();
var express = require('express');
var app = express();
var path = require('path');
var logger = require('morgan');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

app.use(cookieParser());

var mongoose = require('mongoose');
var mongoUri = process.env.MONGODB_URI ||
               'mongodb://localhost/scrabble' + process.env.NODE_ENV;

// mongoose.connect(mongoUri, function(err) {
//   if (err) {
//     console.log('Connection error:', err);
//   } else {
//     console.log('Connection to ' + process.env.NODE_ENV + ' database was successful!');
//   }
// });

var routes = require('./routes/index');
var users = require('./routes/users');

var server = app.listen(process.env.PORT || 3000, function () {
  console.log('Server starting on port 3000');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/js', express.static(__dirname + '/js'));

app.use('/', routes);
app.use('/users', users);

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


module.exports = app;
