var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var orderItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "product" },
  quantity: { type: Number, required: [true, "Quantity is required"] },
  order: { type: Schema.Types.ObjectId, ref: "order" }
});

module.exports = mongoose.model("orderItem", orderItemSchema);
