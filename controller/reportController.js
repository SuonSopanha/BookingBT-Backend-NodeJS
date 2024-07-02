const  Report  = require('../db/models/Report');

// Function to create a report
async function createReport(req, res) {
  try {
    const { UserId, DriverId, ServiceId, reportType, reportContent, reportDate } = req.body;

    // Create the report
    const newReport = await Report.create({
      UserId,
      DriverId,
      ServiceId,
      reportType,
      reportContent,
      reportDate
    });

    // Return success response
    res.status(201).json({ message: 'Report created successfully', report: newReport });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Function to get all reports
async function getAllReports(req, res) {
  try {
    // Find all reports
    const reports = await Report.findAll();

    // Return reports
    res.json(reports);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
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
      return res.status(404).json({ error: 'Report not found' });
    }

    // Return report
    res.json(report);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Function to update a report by ID
async function updateReport(req, res) {
  try {
    const { id } = req.params;
    const { UserId, DriverId, ServiceId, reportType, reportContent, reportDate } = req.body;

    // Find the report by ID
    let foundReport = await Report.findByPk(id);

    // If report not found
    if (!foundReport) {
      return res.status(404).json({ error: 'Report not found' });
    }

    // Update report information
    foundReport = await foundReport.update({
      UserId,
      DriverId,
      ServiceId,
      reportType,
      reportContent,
      reportDate
    });

    // Return success response
    res.json({ message: 'Report updated successfully', report: foundReport });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
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
      return res.status(404).json({ error: 'Report not found' });
    }

    // Delete report
    await foundReport.destroy();

    // Return success response
    res.json({ message: 'Report deleted successfully' });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { createReport, getAllReports, getReportById, updateReport, deleteReport };
