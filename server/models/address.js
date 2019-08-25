const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let addressSchema = new Schema({
    address: { type: String, required: [true, 'El address es necesario'] },
    state: { type: String, required: [true, 'El state es necesario'] },
    city: { type: String, required: [true, 'El city es necesario'] },
    zip: { type: String, required: [true, 'El zip es necesario'] },
    country: { type: String, unique: true, required: [true, 'La country es obligatoria'] },
});


module.exports = mongoose.model('Address', addressSchema);