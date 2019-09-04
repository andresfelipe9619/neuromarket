const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

let rolesValidos = {
  values: ["ADMIN_ROLE", "USER_ROLE"],
  message: "{VALUE} no es un rol válido"
};

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
  name: {
    type: String,
    required: [true, "El name es necesario"]
  },
  email: {
    type: String,
    unique: true,
    required: [true, "El correo es necesario"]
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"]
  },
  phone: {
    type: String,
    requiered: [true, "El telefono es requerido"]
  },
  img: {
    type: String,
    required: false
  },
  role: {
    type: String,
    default: "USER_ROLE",
    enum: rolesValidos
  },
  state: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  },
  facebook: {
    type: Boolean,
    default: false
  },
  favoriteProducts: [{ type: Schema.Types.ObjectId, ref: "product" }],
  interestCategories: [{ type: Schema.Types.ObjectId, ref: "category" }]
});

usuarioSchema.methods.toJSON = function() {
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;

  return userObject;
};

usuarioSchema.plugin(uniqueValidator, { message: "{PATH} debe de ser único" });

module.exports = mongoose.model("user", usuarioSchema);
