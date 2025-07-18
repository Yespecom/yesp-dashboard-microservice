const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true, unique: true },
    storeId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    // Add other product-specific fields as needed
  },
  { timestamps: true },
)

module.exports = ProductSchema
