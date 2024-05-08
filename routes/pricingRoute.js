const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const { createPricing, getAllPricings, getPricingById, updatePricing, deletePricing } = require('../controller/pricingController');

const router = express.Router();

// Middleware to authenticate token for all routes
router.use(authenticateToken);

// Routes
router.post('/', createPricing); // Create a new pricing
router.get('/', getAllPricings); // Get all pricings
router.get('/:id', getPricingById); // Get a single pricing by ID
router.put('/:id', updatePricing); // Update a pricing by ID
router.delete('/:id', deletePricing); // Delete a pricing by ID

module.exports = router;
