const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const { createRating, getAllRatings, getRatingById, updateRating, deleteRating } = require('../controller/ratingController');

const router = express.Router();

// Middleware to authenticate token for all routes
router.use(authenticateToken);

// Routes
router.post('/', createRating); // Create a new rating
router.get('/', getAllRatings); // Get all ratings
router.get('/:id', getRatingById); // Get a single rating by ID
router.put('/:id', updateRating); // Update a rating by ID
router.delete('/:id', deleteRating); // Delete a rating by ID

module.exports = router;
