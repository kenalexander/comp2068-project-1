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

router.get('/', drinksController.index)

router.get( '/new', drinksController.new )

router.get( '/:id/edit', drinksController.edit )

router.post('/', drinksController.create)

router.post( '/:id', drinksController.update )

router.post( '/:id/delete', drinksController.delete )

router.get( '/:id', drinksController.show )

module.exports = router;