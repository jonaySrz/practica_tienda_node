var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var database = require('./database')

var appRouter = require('./routes/routing');

var app = express();

//conexion con mongo
database();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static('public'));

//habilitar CORS
app.use(function(inRequest, inResponse, inNext){
  inResponse.header('Access-Control-Allow-Origin', '*');
  inResponse.header('Access-Control-Allow-Methods', "GET,POST,DELETE,OPTIONS");
  inResponse.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With,Accept");
  inNext();
});

// pre-fligth response
app.options('*', function (req,res) { res.sendStatus(200); });

app.use('/', appRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // res.status(404)
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error')
});

module.exports = app;
