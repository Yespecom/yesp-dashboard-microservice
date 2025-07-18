const mongoose = require("mongoose")

let mainConnection = null
const tenantConnections = {}

const connectMainDB = async () => {
  try {
    if (mainConnection && mainConnection.readyState === 1) {
      console.log("[DB] Main Database already connected.")
      return mainConnection
    }
    mainConnection = await mongoose.createConnection(process.env.MAIN_DB_URI)
    console.log("[DB] Connected to Main Database")
    return mainConnection
  } catch (error) {
    console.error("[DB] Error connecting to Main Database:", error)
    // In a real application, you might want to handle this more gracefully
    // process.exit(1); // Exit process with failure
    throw error // Re-throw to propagate the error
  }
}

// This function now accepts the full dbName
const connectTenantDB = async (dbName) => {
  if (tenantConnections[dbName] && tenantConnections[dbName].readyState === 1) {
    console.log(`[DB] Reusing existing connection for Tenant Database: ${dbName}`)
    return tenantConnections[dbName]
  }
  try {
    console.log(`[DB] Attempting to create new connection for Tenant Database: ${dbName}`)
    // Assuming MONGO_URI is like "mongodb://localhost:27017/"
    // We append the dbName directly, removing any default db from MONGO_URI if present
    const baseUri = process.env.MONGO_URI.split("?")[0].split("/").slice(0, -1).join("/") + "/"
    const conn = await mongoose.createConnection(`${baseUri}${dbName}`)
    tenantConnections[dbName] = conn
    console.log(`[DB] Successfully connected to Tenant Database: ${dbName}`)
    return conn
  } catch (error) {
    console.error(`[DB] Error connecting to Tenant Database ${dbName}:`, error)
    throw error
  }
}

module.exports = { connectMainDB, connectTenantDB }
