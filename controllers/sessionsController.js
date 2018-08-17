var User = require( '../models/user' );
var passport = require( 'passport' );


exports.new = function ( req, res, next ) {
  console.log('attempting to login again')

  let messages = req.session.messages || [];

  // clear the session messages
  req.session.messages = [];

  res.render( 'sessions/new', {
    title: 'User Login',
    messages: messages
  });
};


exports.create = function ( req, res, next ) {
  passport.authenticate( 'local', {
    successRedirect: '/drinks',
    failureRedirect: '/users/new',
    failureMessage: 'Invalid Login'
  })
};

exports.delete = function ( req, res, next ) {

  req.session.messages = [];


  req.logout();


  res.redirect( '/sessions/new' );
};