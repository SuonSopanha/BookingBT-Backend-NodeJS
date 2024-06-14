const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const { createService, getAllServices, getServiceById, updateService, deleteService,displayAllServices,servicesDetails } = require('../controller/serviceController');

const router = express.Router();

// Middleware to authenticate token for all routes


// Routes
router.post('/',authenticateToken, createService); // Create a new service
router.get('/', getAllServices); // Get all services for the authenticated user
router.get('/:id',getServiceById ); // Get a single service by ID for the authenticated user
router.put('/:id',authenticateToken, updateService); // Update a service by ID for the authenticated user
router.delete('/:id',authenticateToken, deleteService); // Delete a service by ID for the authenticated user

router.get('/driver',authenticateToken,getAllServices);
router.get('/driver/:id',authenticateToken,getServiceById);


module.exports = router;
