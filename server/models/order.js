const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let OrderSchema = new Schema(
  {
    address: { type: Schema.Types.ObjectId, ref: "address" },
    user: { type: Schema.Types.ObjectId, ref: "user" },
    products: [{ type: Schema.Types.ObjectId, ref: "product" }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", OrderSchema);
