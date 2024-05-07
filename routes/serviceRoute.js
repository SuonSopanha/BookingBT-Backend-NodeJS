const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const { createService, getAllServices, getServiceById, updateService, deleteService } = require('../controllers/serviceController');

const router = express.Router();

// Middleware to authenticate token for all routes


// Routes
router.post('/',authenticateToken, createService); // Create a new service
router.get('/',authenticateToken, getAllServices); // Get all services for the authenticated user
router.get('/:id',authenticateToken, getServiceById); // Get a single service by ID for the authenticated user
router.put('/:id',authenticateToken, updateService); // Update a service by ID for the authenticated user
router.delete('/:id',authenticateToken, deleteService); // Delete a service by ID for the authenticated user

module.exports = router;
