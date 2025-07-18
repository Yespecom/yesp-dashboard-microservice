const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    storeId: { type: String, required: true },
    customerId: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    status: { type: String, default: "pending" }, // e.g., pending, completed, cancelled
    items: [
      {
        productId: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    // Add other order-specific fields as needed
  },
  { timestamps: true },
)

module.exports = OrderSchema
