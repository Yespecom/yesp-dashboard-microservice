// For local development, create a .env file with these variables:
// PORT=5011
// MAIN_DB_URI=mongodb://localhost:27017/yesp_main_db
// MONGO_URI=mongodb://localhost:27017/ # Base URI for tenant databases
// JWT_SECRET=your_super_secret_key_here

require("dotenv").config()
const express = require("express")
const app = express()
const dashboardRoutes = require("./routes/dashboardRoutes")
const { connectMainDB } = require("./config/db")

// Connect to the main database on app start
connectMainDB()

app.use(express.json())
app.use("/api/dashboard", dashboardRoutes)

app.get("/", (req, res) => {
  res.send("✅ YESP Dashboard Microservice is running!")
})

const PORT = process.env.PORT || 5011
app.listen(PORT, () => {
  console.log(`✅ YESP Dashboard Microservice running on port ${PORT}`)
})
