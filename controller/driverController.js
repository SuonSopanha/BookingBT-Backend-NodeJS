const Driver = require("../db/models/driver");
const Service = require("../db/models/service");
const Schedule = require("../db/models/schedule");
const Pricing = require("../db/models/pricing");

// Function to create a new driver
async function createDriver(req, res) {
  try {
    const userId = req.user.id; // Get userId from request object
    const {
      firstName,
      lastName,
      gender,
      dateOfBirth,
      photoURL,
      contactNumber,
      email,
      address,
    } = req.body;

    // Create the driver with UserId
    const driver = await Driver.create({
      userId: userId,
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
    res.status(201).json({ message: "Driver created successfully", driver });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Function to get all drivers
async function getAllDrivers(req, res) {
  try {
    // Find all drivers associated with the UserId
    const drivers = await Driver.findAll();

    // Return drivers
    res.json(drivers);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getTopDrivers(req, res) {
  try {
    // Find top 5 drivers with the highest rating
    const topDrivers = await Driver.findAll({
      limit: 5,
      order: [["averageRating", "DESC"]],
    });

    // Return top drivers
    res.json(topDrivers);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Function to get a single driver by ID
async function getDriverById(req, res) {
  try {
    const { id } = req.params;
    // Find driver by ID associated with the UserId
    const driver = await Driver.findOne({ where: { id, UserId: req.user.id } });

    // If driver not found
    if (!driver) {
      return res.status(404).json({ error: "Driver not found" });
    }

    // Return driver
    res.json(driver);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Function to update a driver
async function updateDriver(req, res) {
  try {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      gender,
      dateOfBirth,
      photoURL,
      contactNumber,
      email,
      address,
    } = req.body;

    // Find driver by ID associated with the UserId
    let driver = await Driver.findOne({ where: { id, UserId: req.user.id } });

    // If driver not found
    if (!driver) {
      return res.status(404).json({ error: "Driver not found" });
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
    res.json({ message: "Driver updated successfully", driver });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
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
      return res.status(404).json({ error: "Driver not found" });
    }

    // Delete driver
    await driver.destroy();

    // Return success response
    res.json({ message: "Driver deleted successfully" });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function checkDriverRole(req, res, next) {
  const userId = req.user.id;

  try {
    const driver = await Driver.findOne({ where: { userId: userId } });
    if (!driver) {
      return res.json({ isDriver: false });
    } else {
      return res.json({ isDriver: true });
    }
  } catch (e) {
    return res.json({ error: e.message });
  }

  return;
}

async function getUnApprovedDrivers(req, res) {
  try {
    // Fetch unapproved drivers
    const drivers = await Driver.findAll({ where: { isApproved: false } });

    // Fetch services for each driver
    const driverWithServices = await Promise.all(
      drivers.map(async (driver) => {
        const services = await Service.findAll({
          where: { driverId: driver.id },
        });
        return {
          ...driver.toJSON(),
          services,
        };
      })
    );

    res.json(driverWithServices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}



async function getDriverDetails(req, res) {
  const { id } = req.params;
  const driverId = parseInt(id);
  try {
    // Fetch driver details by ID
    const driver = await Driver.findByPk(driverId);
    if (!driver) {
      return res.status(404).json({ error: 'Driver not found' });
    }

    // Fetch one of the driver's services
    const service = await Service.findOne({ where: { driverId: driverId } });
    if (!service) {
      return res.status(404).json({ error: 'Service not found for the driver' });
    }

    // Fetch one schedule using the service ID
    const schedule = await Schedule.findOne({ where: { serviceId: service.id } });
    if (!schedule) {
      return res.status(404).json({ error: 'Schedule not found for the service' });
    }

    // Fetch one pricing using the service ID
    const pricing = await Pricing.findOne({ where: { serviceId: service.id } });
    if (!pricing) {
      return res.status(404).json({ error: 'Pricing not found for the service' });
    }

    // Combine results
    const result = {
      driver: driver.toJSON(),
      service: service.toJSON(),
      schedule: schedule.toJSON(),
      pricing: pricing.toJSON()
    };

    // Send the combined result as a JSON response
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  createDriver,
  getAllDrivers,
  getDriverById,
  updateDriver,
  deleteDriver,
  getTopDrivers,
  checkDriverRole,
  getUnApprovedDrivers,
  getDriverDetails,
};
