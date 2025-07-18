const mongoose = require("mongoose")

const TenantSchema = new mongoose.Schema(
  {
    tenantId: { type: String, required: true, unique: true },
    dbName: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    // Add other tenant-specific fields as needed
  },
  { timestamps: true },
)

module.exports = TenantSchema
