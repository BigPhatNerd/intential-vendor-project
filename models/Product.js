const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  priceCents: {
    type: Number,
    required: true,
    min: 0,
  },
  quantity: {
    type: Number,
    // set max quantity to 100
    max: 100,
    min: 0,
  },
  lastUpdatedBy: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
  },
});

const Product = model("Product", ProductSchema);

module.exports = Product;
