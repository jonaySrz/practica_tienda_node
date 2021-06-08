var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var articulosSchema = new Schema({
    _id: {type: mongoose.ObjectId},
    codigo: {type: Number},
    descripcion: {type: String},
    familia: {type: String},
    impuesto: {type: Number},
    precio: {type: Number},
    stock: {type: Number}
})

module.exports = mongoose.model('articulos',articulosSchema);