const { connectMainDB, connectTenantDB } = require("../config/db")
const TenantSchema = require("../models/main/Tenant")
const OrderSchema = require("../models/tenant/Order")
const ProductSchema = require("../models/tenant/Product")
const CustomerSchema = require("../models/tenant/Customer")

exports.getSummary = async (req, res) => {
  const { tenantId, storeId } = req

  if (!tenantId || !storeId) {
    return res.status(400).json({ message: "Tenant ID and Store ID are required in token." })
  }

  try {
    // Get the main database connection
    const mainDb = await connectMainDB()
    // Get the Tenant model from the main connection
    const Tenant = mainDb.model("Tenant", TenantSchema)
    const tenant = await Tenant.findOne({ tenantId })

    if (!tenant) {
      return res.status(404).json({ message: "Tenant not found." })
    }

    // Connect to the specific tenant database
    const tenantDb = await connectTenantDB(tenant.dbName)

    // Get models from the tenant-specific connection
    const Order = tenantDb.model("Order", OrderSchema)
    const Product = tenantDb.model("Product", ProductSchema)
    const Customer = tenantDb.model("Customer", CustomerSchema)

    const totalOrders = await Order.countDocuments({ storeId })
    const totalSales = await Order.aggregate([
      { $match: { storeId } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ])
    const totalCustomers = await Customer.countDocuments({ storeId })
    const totalProducts = await Product.countDocuments({ storeId })

    res.json({
      totalOrders,
      totalSales: totalSales[0]?.total || 0,
      totalCustomers,
      totalProducts,
    })
  } catch (err) {
    console.error("Dashboard summary error:", err)
    res.status(500).json({ message: "Dashboard error" })
  }
}
