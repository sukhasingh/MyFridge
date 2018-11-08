var mongoose = require('mongoose');

var Food_Schema = new mongoose.Schema({
    name: {type: String, required: true},
    date: {type: Date, required: true},
    expiry: {type: Date},
    left_overs: {type: Boolean, "default": false},
    quantity: {type: Number, "default": 1, min: 1}
});

mongoose.model('food', Food_Schema);