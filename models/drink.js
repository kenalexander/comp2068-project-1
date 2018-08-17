var mongoose = require( 'mongoose' )


var drinkSchema = new mongoose.Schema({
    
    drinkName: {type: String, required: 'Please enter the name of the drink.'},
    alcoholLimit: {type: Number, required: 'Please enter the alcohol limit.'},
    volume: {type: Number, required: 'Please enter the volume.'},
    description: {type: String}
})

module.exports = mongoose.model( 'Drink', drinkSchema )