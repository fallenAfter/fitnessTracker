var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose= require('mongoose');

var routes = require('./routes/index');
var users = require('./routes/users');
var workouts= require('./routes/workouts');

var app = express();


//set up database connection
var db= mongoose.connection;
//if error return result
db.on('error', console.error.bind(console, 'db error: '));
//notify consle upon succesful connection
db.once('open', function(callback){
  console.log('Connected to database');
});

//connect to database
mongoose.connect('mongodb://localhost/test');

//error handle connection
var conn= mongoose.connection;
conn.on('error', console.error.bind(console, 'DB Error: '));
conn.once('open', function(callback){
  console.log('Fueled up and ready to go');
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/workouts', workouts);

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
