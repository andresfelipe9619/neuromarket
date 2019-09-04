const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let OrderSchema = new Schema(
  {
    address: { type: Schema.Types.ObjectId, ref: "address" },
    user: { type: Schema.Types.ObjectId, ref: "user" },
    orderItems: [{ type: Schema.Types.ObjectId, ref: "orderItem" }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", OrderSchema);
