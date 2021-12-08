const mongoose = require("mongoose");

const orderSchema =mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true} , 
    paternoLastName: {type: String, required: true},
    maternoLastName: {type: String, required: true},
    email: {type: String, required: true},
    phone:{type: String, required: true}
})


module.exports = mongoose.model('Client', orderSchema);