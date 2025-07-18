

require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors") 
const dashboardRoutes = require("./routes/dashboardRoutes")
const { connectMainDB } = require("./config/db")

// Connect to the main database on app start
connectMainDB()

app.use(express.json())
app.use(cors())
app.use("/api/dashboard", dashboardRoutes)

app.get("/", (req, res) => {
  res.send("✅ YESP Dashboard Microservice is running!")
})

const PORT = process.env.PORT || 5011
app.listen(PORT, () => {
  console.log(`✅ YESP Dashboard Microservice running on port ${PORT}`)
})
