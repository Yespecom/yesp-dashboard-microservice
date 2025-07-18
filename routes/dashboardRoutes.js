const express = require("express")
const router = express.Router()
const auth = require("../middleware/authMiddleware")
const { getSummary } = require("../controllers/dashboardController")

router.get("/summary", auth, getSummary)

module.exports = router
