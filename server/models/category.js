const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let categoriaSchema = new Schema({
    name: { type: String, required: [true, 'El name es necesario'] },
    description: { type: String, unique: true, required: [true, 'La descripción es obligatoria'] },
    user: { type: Schema.Types.ObjectId, ref: 'user' }
});


module.exports = mongoose.model('Category', categoriaSchema);