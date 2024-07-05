const Report = require("../db/models/Report");
const Booking = require("../db/models/Booking");
const Driver = require("../db/models/Driver");

async function createReport(req, res) {
  try {
    const { DriverId, reportType, reportContent, reportDate } = req.body;

    const userId = req.user.id;

    // Check if the user has booked this driver before
    const userBooking = await Booking.findOne({
      where: { userId: userId, driverId: DriverId },
    });

    if (!userBooking) {
      return res.status(403).json({
        error: "No permission to report. You have never booked this driver.",
      });
    }

    // Check if the user has already reported this driver
    const existingReport = await Report.findOne({
      where: { userId: userId, driverId: DriverId },
    });

    if (existingReport) {
      return res.status(403).json({
        error: "You have already reported this driver.",
      });
    }

    // Create the report
    const newReport = await Report.create({
      userId,
      driverId: DriverId,
      reportType,
      reportContent,
      reportDate,
      
    });

    // (Optional) Perform any additional processing or aggregation with the reports

    // Return success response
    res
      .status(201)
      .json({ message: "Report created successfully", report: newReport });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getAllReports(req, res) {
  try {
    // Find all reports
    const reports = await Report.findAll();

    // Extract all driver IDs from the reports
    const driverIds = reports.map((report) => report.driverId);

    // Find all drivers corresponding to the driver IDs
    const drivers = await Driver.findAll({
      where: {
        id: driverIds,
      },
    });

    // Create a map of drivers by their IDs
    const driverMap = drivers.reduce((map, driver) => {
      map[driver.id] = driver;
      return map;
    }, {});

    // Attach driver data to each report
    const reportsWithDriverData = reports.map((report) => {
      return {
        ...report.toJSON(),
        driver: driverMap[report.driverId],
      };
    });

    // Return reports with driver data
    res.json(reportsWithDriverData);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Function to get a single report by ID
async function getReportById(req, res) {
  try {
    const { id } = req.params;

    // Find the report by ID
    const report = await Report.findByPk(id);

    // If report not found
    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }

    // Return report
    res.json(report);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Function to update a report by ID
async function updateReport(req, res) {
  try {
    const { id } = req.params;
    const {
      UserId,
      DriverId,
      ServiceId,
      reportType,
      reportContent,
      reportDate,
    } = req.body;

    // Find the report by ID
    let foundReport = await Report.findByPk(id);

    // If report not found
    if (!foundReport) {
      return res.status(404).json({ error: "Report not found" });
    }

    // Update report information
    foundReport = await foundReport.update({
      UserId,
      DriverId,
      ServiceId,
      reportType,
      reportContent,
      reportDate,
    });

    // Return success response
    res.json({ message: "Report updated successfully", report: foundReport });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Function to delete a report by ID
async function deleteReport(req, res) {
  try {
    const { id } = req.params;

    // Find the report by ID
    const foundReport = await Report.findByPk(id);

    // If report not found
    if (!foundReport) {
      return res.status(404).json({ error: "Report not found" });
    }

    // Delete report
    await foundReport.destroy();

    // Return success response
    res.json({ message: "Report deleted successfully" });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  createReport,
  getAllReports,
  getReportById,
  updateReport,
  deleteReport,
};
