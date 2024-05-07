const express = require("express");
const authenticateToken = require("../middleware/authenticateToken");
const {
  createDriver,
  getAllDrivers,
  getDriverById,
  updateDriver,
  deleteDriver,
} = require("../controllers/driverController");

const router = express.Router();

// Routes
router.post("/", authenticateToken, createDriver); // Create a new driver
router.get("/", authenticateToken, getAllDrivers); // Get all drivers
router.get("/:id", authenticateToken, getDriverById); // Get a single driver by ID
router.put("/:id", authenticateToken, updateDriver); // Update a driver by ID
router.delete("/:id", authenticateToken, deleteDriver); // Delete a driver by ID

module.exports = router;
