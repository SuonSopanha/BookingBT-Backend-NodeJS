const Suspension = require("../db/models/Suspension");
const Driver = require("../db/models/Driver");

// Function to create a suspension
async function createSuspension(req, res) {
  try {
    const { userId, driverId, suspensionLevel, reason, startDate, endDate } =
      req.body;

    // Create the suspension
    const suspension = await Suspension.create({
      userId,
      driverId,
      suspensionLevel,
      reason,
      startDate,
      endDate,
    });

    // Return success response
    res
      .status(201)
      .json({ message: "Suspension created successfully", suspension });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Function to get all suspensions
async function getAllSuspensions(req, res) {
  try {
    const suspensions = await Suspension.findAll({
      order: [["createdAt", "DESC"]], // Sort suspensions in reverse order by creation date
    });

    // Return suspensions
    res.json(suspensions);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Function to get a single suspension by ID
async function getSuspensionById(req, res) {
  try {
    const { id } = req.params;

    // Find the suspension by ID
    const suspension = await Suspension.findByPk(id);

    // If suspension not found
    if (!suspension) {
      return res.status(404).json({ error: "Suspension not found" });
    }

    // Return suspension
    res.json(suspension);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Function to update a suspension by ID
async function updateSuspension(req, res) {
  try {
    const { id } = req.params;
    const { suspensionLevel, reason, startDate, endDate } = req.body;

    // Find the suspension by ID
    let suspension = await Suspension.findByPk(id);

    // If suspension not found
    if (!suspension) {
      return res.status(404).json({ error: "Suspension not found" });
    }

    // Update suspension information
    suspension = await suspension.update({
      suspensionLevel,
      reason,
      startDate,
      endDate,
    });

    // Return success response
    res.json({ message: "Suspension updated successfully", suspension });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Function to delete a suspension by ID
async function deleteSuspension(req, res) {
  try {
    const { id } = req.params;

    // Find the suspension by ID
    const suspension = await Suspension.findByPk(id);

    // If suspension not found
    if (!suspension) {
      return res.status(404).json({ error: "Suspension not found" });
    }

    // Delete suspension
    await suspension.destroy();

    // Return success response
    res.json({ message: "Suspension deleted successfully" });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Function to suspend a user
async function suspendUser(req, res) {
  try {
    const { id } = req.params;
    const { userId, suspensionLevel, reason, startDate, endDate } = req.body;

    // Create the suspension for the user
    const suspension = await Suspension.create({
      userId,
      suspensionLevel,
      reason,
      startDate,
      endDate,
    });

    // Return success response
    res
      .status(201)
      .json({ message: "User suspended successfully", suspension });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function suspendDriver(req, res) {
  try {
    const { id } = req.params; // assuming this is the driver's ID
    const { reason, duration } = req.body;

    let suspensionLevel;
    let endDate = new Date();

    // Set the suspension level and calculate the end date
    switch (duration) {
      case "1":
        suspensionLevel = 1;
        endDate.setDate(endDate.getDate() + 1);
        break;
      case "3":
        suspensionLevel = 2;
        endDate.setDate(endDate.getDate() + 3);
        break;
      case "7":
        suspensionLevel = 3;
        endDate.setDate(endDate.getDate() + 7);
        break;
      case "30":
        suspensionLevel = 4;
        endDate.setDate(endDate.getDate() + 30);
        break;
      default:
        return res.status(400).json({ error: "Invalid duration" });
    }

    // Create the suspension for the driver
    const suspension = await Suspension.create({
      driverId: id,
      suspensionLevel,
      reason,
      startDate: new Date(),
      endDate,
    });

    // Find the driver by ID
    const driver = await Driver.findByPk(id);

    if (!driver) {
      return res.status(404).json({ error: "Driver not found" });
    }

    // Update driver.isSuspended to true
    driver.isSuspended = true;
    await driver.save();

    // Return success response
    res
      .status(201)
      .json({ message: "Driver suspended successfully", suspension });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function unsuspendDriver(req,res) {
  try {
    const { id } = req.params; // assuming this is the driver's ID

    // Find the driver by ID
    const driver = await Driver.findByPk(id);

    if (!driver) {
      return res.status(404).json({ error: "Driver not found" });
    }

    // Update driver.isSuspended to true
    driver.isSuspended = false;
    await driver.save();

    // Return success response
    res
      .status(201)
      .json({ message: "Driver unsuspended successfully", driver });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  createSuspension,
  getAllSuspensions,
  getSuspensionById,
  updateSuspension,
  deleteSuspension,
  suspendUser,
  suspendDriver,
  unsuspendDriver,
};
