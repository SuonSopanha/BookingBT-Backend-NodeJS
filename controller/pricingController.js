const Pricing = require('../db/models/pricing');

// Function to create a pricing
async function createPricing(req, res) {
  try {
    const { serviceId, baseFare, additionalCharge, soloCharge, description,currencyType } = req.body;

    // Create the pricing
    const pricing = await Pricing.create({
      serviceId,
      baseFare,
      additionalCharge,
      soloCharge,
      description,
      currencyType
    });

    // Return success response
    res.status(201).json({ message: 'Pricing created successfully', pricing });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Function to get all pricings
async function getAllPricings(req, res) {
  try {
    // Find all pricings
    const pricings = await Pricing.findAll();

    // Return pricings
    res.json(pricings);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Function to get a single pricing by ID
async function getPricingById(req, res) {
  try {
    const { id } = req.params;

    // Find the pricing by ID
    const pricing = await Pricing.findByPk(id);

    // If pricing not found
    if (!pricing) {
      return res.status(404).json({ error: 'Pricing not found' });
    }

    // Return pricing
    res.json(pricing);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Function to update a pricing by ID
async function updatePricing(req, res) {
  try {
    const { id } = req.params;
    const { baseFare, additionalCharge, soloCharge, description } = req.body;

    // Find the pricing by ID
    let pricing = await Pricing.findByPk(id);

    // If pricing not found
    if (!pricing) {
      return res.status(404).json({ error: 'Pricing not found' });
    }

    // Update pricing information
    pricing = await pricing.update({
      baseFare,
      additionalCharge,
      soloCharge,
      description,
    });

    // Return success response
    res.json({ message: 'Pricing updated successfully', pricing });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Function to delete a pricing by ID
async function deletePricing(req, res) {
  try {
    const { id } = req.params;

    // Find the pricing by ID
    const pricing = await Pricing.findByPk(id);

    // If pricing not found
    if (!pricing) {
      return res.status(404).json({ error: 'Pricing not found' });
    }

    // Delete pricing
    await pricing.destroy();

    // Return success response
    res.json({ message: 'Pricing deleted successfully' });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { createPricing, getAllPricings, getPricingById, updatePricing, deletePricing };
