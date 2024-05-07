const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const { createSchedule, getAllSchedules, getScheduleById, updateSchedule, deleteSchedule } = require('../controllers/scheduleController');

const router = express.Router();

// Middleware to authenticate token for all routes
router.use(authenticateToken);

// Routes
router.post('/', createSchedule); // Create a new schedule
router.get('/', getAllSchedules); // Get all schedules
router.get('/:id', getScheduleById); // Get a single schedule by ID
router.put('/:id', updateSchedule); // Update a schedule by ID
router.delete('/:id', deleteSchedule); // Delete a schedule by ID

module.exports = router;
