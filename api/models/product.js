const mongoose = require("mongoose");

const productSchema =mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true} , 
    author:{type: String, required: true},
    editorial:{type: String, required: true},
    genre:{type: String, required: true},
    price: {type: Number, required: true} 
})


module.exports = mongoose.model('Product', productSchema);

