var Drink = require( '../models/drink' )

/* VIEWS */
// Index (View)
exports.index = function( req, res, next ) {

  locals = {
    title: 'Drinks List'
  }

  Drink.find().then(function (drinks) {
    locals.drinks = drinks

    res.render('drinks/index', locals)
  })
}

// New (View)
exports.new = function ( req, res ) {

  locals = {
    title: 'New Drink'
  }

  res.render('drinks/new', locals);
}

// Create (Action)
exports.create = function ( req, res, next ) {

  Drink.create({
    drinkName: req.body.drinkName,
    volume: req.body.volume,
    alcoholLimit: req.body.alcoholLimit,
    description: req.body.description
  })
  .then(function () {
    res.redirect('/drinks')
  })
  .catch(function (err) {
    next(err)
  })
}

/* STUBS */
// Show (View)
exports.show = function ( req, res, next ) { return "show" }

// Edit (View)
exports.edit = function ( req, res, next ) { return "Edit" }

// Update (Action)
exports.update = function ( req, res, next ) { return "update" }

// Delete (Action)
exports.delete = function ( req, res ) { return "delete" }