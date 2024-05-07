const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const { createReport, getAllReports, getReportById, updateReport, deleteReport } = require('../controllers/reportController');

const router = express.Router();

// Middleware to authenticate token for all routes
router.use(authenticateToken);

// Routes
router.post('/', createReport); // Create a new report
router.get('/', getAllReports); // Get all reports
router.get('/:id', getReportById); // Get a single report by ID
router.put('/:id', updateReport); // Update a report by ID
router.delete('/:id', deleteReport); // Delete a report by ID

module.exports = router;
