const mongoose = require("mongoose");
const moment = require('moment-timezone');
const format = require('date-fns');
const dateMexico = moment.tz(Date.now(), "America/Mexico_City");
console.log(dateMexico)

const orderSchema =mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
    client : {type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true},
    quantity: {type: Number, default: 1},
    createdAt: {type: Date, default: dateMexico}
})


module.exports = mongoose.model('Order', orderSchema);