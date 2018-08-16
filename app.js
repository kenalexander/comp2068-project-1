var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');

var drinksRouter = require('./routes/drinks');

var sessionsRouter = require('./routes/sessions');

var usersRouter = require('./routes/users');

var app = express();

var mongoose = require( 'mongoose' );
var config = require( './config/connect' );

const passport = require( 'passport' );
const session = require( 'express-session' );
const localStrategy = require( 'passport-local' ).Strategy;

mongoose.connect( config.db );

app.use( session({
  secret: 'any string for salting here', // salt key for hashing
  resave: true, // stop user from being logged out
  saveUninitialized: false // don't start a session if guest
}));

app.use( passport.initialize() );
app.use( passport.session() );

const User = require( './models/user' );
passport.use( User.createStrategy() );

passport.serializeUser( User.serializeUser() );
passport.deserializeUser( User.deserializeUser() );

app.use( function ( req, res, next ) {
  res.locals.authenticated = req.isAuthenticated()
  next()
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/drinks', drinksRouter);

app.use('/users', usersRouter);

app.use('/sessions', sessionsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
