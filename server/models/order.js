const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let OrderSchema = new Schema(
  {
    address: { type: Schema.Types.ObjectId, ref: "address" },
    user: { type: Schema.Types.ObjectId, ref: "user" },
    products: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "product" },
        quantity: Number
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
