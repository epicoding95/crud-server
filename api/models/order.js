const mongoose = require('mongoose');


//you can create a relation type as we are below with the 'Product'
const orderScehma = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, default: 1 }  //default is added so if a user doesnt pass an amount it automatically becomes a quantity of 1
})

module.exports = mongoose.model('Order', orderScehma)