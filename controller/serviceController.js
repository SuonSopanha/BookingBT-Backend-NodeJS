const { Service } = require('../models');

// Function to create a service
async function createService(req, res) {
  try {
    const { userId } = req.user; // Get userId from JWT token
    const { soloRideOption, destination, location, vehicleType, maxSeat, vehiclePictureURL } = req.body;

    // Create the service
    const service = await Service.create({
      DriverId: userId,
      soloRideOption,
      destination,
      location,
      vehicleType,
      maxSeat,
      vehiclePictureURL,
    });

    // Return success response
    res.status(201).json({ message: 'Service created successfully', service });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Function to get all services for a user
async function getAllServices(req, res) {
  try {
    const { userId } = req.user; // Get userId from JWT token

    // Find all services for the user
    const services = await Service.findAll({ where: { DriverId: userId } });

    // Return services
    res.json(services);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Function to get a single service by ID
async function getServiceById(req, res) {
  try {
    const { id } = req.params;
    const { userId } = req.user; // Get userId from JWT token

    // Find the service by ID for the user
    const service = await Service.findOne({ where: { id, DriverId: userId } });

    // If service not found
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    // Return service
    res.json(service);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Function to update a service by ID
async function updateService(req, res) {
  try {
    const { id } = req.params;
    const { userId } = req.user; // Get userId from JWT token
    const { soloRideOption, destination, location, vehicleType, maxSeat, vehiclePictureURL } = req.body;

    // Find the service by ID for the user
    let service = await Service.findOne({ where: { id, DriverId: userId } });

    // If service not found
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    // Update service information
    service = await service.update({
      soloRideOption,
      destination,
      location,
      vehicleType,
      maxSeat,
      vehiclePictureURL,
    });

    // Return success response
    res.json({ message: 'Service updated successfully', service });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Function to delete a service by ID
async function deleteService(req, res) {
  try {
    const { id } = req.params;
    const { userId } = req.user; // Get userId from JWT token

    // Find the service by ID for the user
    const service = await Service.findOne({ where: { id, DriverId: userId } });

    // If service not found
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    // Delete service
    await service.destroy();

    // Return success response
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { createService, getAllServices, getServiceById, updateService, deleteService };
