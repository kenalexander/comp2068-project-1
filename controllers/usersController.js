var User = require( '../models/user' );
var passport = require( 'passport' );

/* VIEWS */
exports.new = function ( req, res, next ) {

  let messages = req.session.messages || [];


  req.session.messages = [];

  res.render( 'users/new', {
    title: 'User Registration',
    messages: messages,
    user: req.user
  });
}

exports.create = function ( req, res, next ) {
  User.register( new User({
    username: req.body.username
  }), req.body.password )
  .then( function ( user ) {
    req.login( user, function () {
      res.redirect( '/drinks' );
    });
  })
  .catch( function ( err ) {
    req.session.messages = 'ERROR: Invalid User; Please re-enter information.';

    res.redirect( '/users/new' );
  });
}