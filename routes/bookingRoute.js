const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const { createBooking, getAllBookings, getBookingById, updateBooking, deleteBooking } = require('../controllers/bookingController');

const router = express.Router();

// Middleware to authenticate token for all routes
router.use(authenticateToken);

// Routes
router.post('/', createBooking); // Create a new booking
router.get('/', getAllBookings); // Get all bookings
router.get('/:id', getBookingById); // Get a single booking by ID
router.put('/:id', updateBooking); // Update a booking by ID
router.delete('/:id', deleteBooking); // Delete a booking by ID

module.exports = router;
