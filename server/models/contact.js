var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var contactSchema = new Schema({
    name: { type: String, required: [true, "El name es necesario"] },
    lastname: { type: String, required: [true, "El lastname es necesario"] },
    description: { type: String, required: [true, "la descripcion de tu pregutna  es necesario"] },
    email: { type: String, unique: true, required: [true, "El correo es necesario"] },
});

module.exports = mongoose.model("contact", contactSchema);