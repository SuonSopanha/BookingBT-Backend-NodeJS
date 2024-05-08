const  Driver = require("../db/models/driver");

// Function to create a new driver
async function createDriver(req, res) {
  try {
    const  userId  = req.user.id; // Get userId from request object
    const { firstName, lastName, gender, dateOfBirth, photoURL, contactNumber, email, address } = req.body;

    // Create the driver with UserId
    const driver = await Driver.create({
      UserId: userId,
      firstName,
      lastName,
      gender,
      dateOfBirth,
      photoURL,
      contactNumber,
      email,
      address,
    });

    // Return success response
    res.status(201).json({ message: 'Driver created successfully', driver });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Function to get all drivers
async function getAllDrivers(req, res) {
  try {
    // Find all drivers associated with the UserId
    const drivers = await Driver.findAll({ where: { UserId: req.user.id } });

    // Return drivers
    res.json(drivers);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Function to get a single driver by ID
async function getDriverById(req, res) {
  try {
    const { id } = req.params;
    // Find driver by ID associated with the UserId
    const driver = await Driver.findOne({ where: { id , UserId: req.user.id} });

    // If driver not found
    if (!driver) {
      return res.status(404).json({ error: 'Driver not found' });
    }

    // Return driver
    res.json(driver);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Function to update a driver
async function updateDriver(req, res) {
  try {
    const { id } = req.params;
    const { firstName, lastName, gender, dateOfBirth, photoURL, contactNumber, email, address } = req.body;

    // Find driver by ID associated with the UserId
    let driver = await Driver.findOne({ where: { id, UserId: req.user.id } });

    // If driver not found
    if (!driver) {
      return res.status(404).json({ error: 'Driver not found' });
    }

    // Update driver information
    driver = await driver.update({
      firstName: firstName || driver.firstName,
      lastName: lastName || driver.lastName,
      gender: gender || driver.gender,
      dateOfBirth: dateOfBirth || driver.dateOfBirth,
      photoURL: photoURL || driver.photoURL,
      contactNumber: contactNumber || driver.contactNumber,
      email: email || driver.email,
      address: address || driver.address,
    });

    // Return success response
    res.json({ message: 'Driver updated successfully', driver });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Function to delete a driver
async function deleteDriver(req, res) {
  try {
    const { id } = req.params;

    // Find driver by ID associated with the UserId
    const driver = await Driver.findOne({ where: { id, UserId: req.user.id } });

    // If driver not found
    if (!driver) {
      return res.status(404).json({ error: 'Driver not found' });
    }

    // Delete driver
    await driver.destroy();

    // Return success response
    res.json({ message: 'Driver deleted successfully' });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { createDriver, getAllDrivers, getDriverById, updateDriver, deleteDriver };
