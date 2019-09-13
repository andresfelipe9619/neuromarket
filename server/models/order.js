const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let OrderSchema = new Schema(
  {
    address: {
      address: { type: String, required: false },
      state: { type: String, required: false },
      city: { type: String, required: false },
      zip: { type: String, required: false },
      country: {
        type: String,
        required: false
      }
    },
    user: { type: Schema.Types.ObjectId, ref: "user" },
    products: [
      {
        name: { type: String, required: [true, "El name es necesario"] },
        price: {
          type: Number,
          required: [true, "El precio únitario es necesario"]
        },
        description: { type: String, required: false },
        imgurls: { type: String, required: false },
        quantity: { type: Number, required: true, default: 0 },
        ammount: { type: Number, required: true, default: 0 },
        category: {
          type: Schema.Types.ObjectId,
          ref: "category",
          required: true
        }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", OrderSchema);
