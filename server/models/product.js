var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var productSchema = new Schema({
    name: { type: String, required: [true, 'El name es necesario'] },
    price: { type: Number, required: [true, 'El precio únitario es necesario'] },
    description: { type: String, required: false },
    img: { type: String, required: false },
    availability: { type: Boolean, required: true, default: true },
    category: { type: Schema.Types.ObjectId, ref: 'category', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'user' }
});


module.exports = mongoose.model('Product', productSchema);