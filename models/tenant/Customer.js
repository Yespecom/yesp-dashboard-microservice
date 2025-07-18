const mongoose = require("mongoose")

const CustomerSchema = new mongoose.Schema(
  {
    customerId: { type: String, required: true, unique: true },
    storeId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    address: { type: String },
    // Add other customer-specific fields as needed
  },
  { timestamps: true },
)

module.exports = CustomerSchema
