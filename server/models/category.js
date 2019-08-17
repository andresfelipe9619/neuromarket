const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let categoriaSchema = new Schema({
    description: { type: String, unique: true, required: [true, 'La descripción es obligatoria'] },
    user: { type: Schema.Types.ObjectId, ref: 'user' }
});


module.exports = mongoose.model('Category', categoriaSchema);