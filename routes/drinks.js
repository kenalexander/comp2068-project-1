var express = require('express')
var router = express.Router()

// create a link to our drink model
var drinksController = require('../controllers/drinksController')

// sends to home landing page
router.get( '/home', function(req, res){
	res.render('home', locals = {
    	title: 'Alexander Liquor Emporium'
  	})
} )

// index (http://my-app.com/products)
router.get('/', drinksController.index)

// new (http://my-app.com/products/new)
router.get( '/new', drinksController.new )

// edit (http://my-app.com/products/12345/edit)
router.get( '/:id/edit', drinksController.edit )

// create (http://my-app.com/products)
router.post('/', drinksController.create)
// update (http://my-app.com/products/12345)

router.post( '/:id', drinksController.update )

// delete (http://my-app.com/products/12345/delete)
router.post( '/:id/delete', drinksController.delete )

// makes our file public to the application

router.get( '/:id', drinksController.show )

module.exports = router;