var mongoose = require( 'mongoose' )

// all model classes will inherit from 
// the mongoose.Schema class
var drinkSchema = new mongoose.Schema({
    
    drinkName: {type: String, required: 'Please enter the name of the drink.'},
    alcoholLimit: {type: Number, required: 'Please enter the alcohol limit.'},
    volume: {type: Number, required: 'Please enter the volume.'},
    description: {type: String}
})

// make this class public
module.exports = mongoose.model( 'Drink', drinkSchema )