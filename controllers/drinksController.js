var Drink = require( '../models/drink' )

exports.index = function( req, res, next ) {

  locals = {
    title: 'Behind the Bar'
  }

  Drink.find().then(function (drinks) {
    locals.drinks = drinks

    res.render('drinks/index', locals)
  })
}

exports.new = function ( req, res ) {

  locals = {
    title: 'Add New Drink to Menu'
  }

  res.render('drinks/new', locals);
}

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

exports.show = function ( req, res, next ) { 

  let locals = {
    title: 'Behind the Bar'
  }

  Drink.findById({
    _id: req.params.id
  })
  .then( function ( drink ) {
    locals.drink = drink
    res.render( 'drinks/show', locals )
  })
  .catch( function ( err ) {
    next( err )
  })
}

exports.edit = function ( req, res ) { 
  
  locals = {
    title: 'Edit Drink'
  };

  Drink.findById({
    _id: req.params.id
  })
  .then( function ( drink ) {

    locals.drink = drink;


    res.render( 'drinks/edit', locals )
  })
  .catch( function ( err ) {
    next( err )
  })
}

exports.update = function ( req, res, next ) {

 Drink.findById( req.params.id )
  .then(function ( drink ) {

    drink.drinkName = req.body.drinkName
    drink.volume = req.body.volume
    drink.alcoholLimit = req.body.alcoholLimit
    drink.description = req.body.description

    drink.save()
    .then(  function () {
      res.redirect( '/drinks' )
    })
    .catch( function ( err ) {
      next( err )
    })
  })
  .catch(function ( err ) {
    next( err )
  })
}

exports.delete = function ( req, res, next) { 
  Drink.remove({
    _id: req.body.id
  })
  .then( function () {
    res.redirect( '/drinks' )
  })
  .catch( function ( err ) {
    next( err )
  })
}



