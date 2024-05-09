const Schedule = require('../db/models/schedule');

// Function to create a schedule
async function createSchedule(req, res) {
  try {
    const { ServiceID, dayOfWeek, departureTime, arrivalTime } = req.body;

    // Create the schedule
    const schedule = await Schedule.create({
      ServiceID,
      dayOfWeek,
      departureTime,
      arrivalTime,
    });

    // Return success response
    res.status(201).json({ message: 'Schedule created successfully', schedule });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Function to get all schedules
async function getAllSchedules(req, res) {
  try {
    // Find all schedules
    const schedules = await Schedule.findAll();

    // Return schedules
    res.json(schedules);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Function to get a single schedule by ID
async function getScheduleById(req, res) {
  try {
    const { id } = req.params;

    // Find the schedule by ID
    const schedule = await Schedule.findByPk(id);

    // If schedule not found
    if (!schedule) {
      return res.status(404).json({ error: 'Schedule not found' });
    }

    // Return schedule
    res.json(schedule);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Function to update a schedule by ID
async function updateSchedule(req, res) {
  try {
    const { id } = req.params;
    const { dayOfWeek, departureTime, arrivalTime } = req.body;

    // Find the schedule by ID
    let schedule = await Schedule.findByPk(id);

    // If schedule not found
    if (!schedule) {
      return res.status(404).json({ error: 'Schedule not found' });
    }

    // Update schedule information
    schedule = await schedule.update({
      dayOfWeek: dayOfWeek || schedule.dayOfWeek,
      departureTime: departureTime || schedule.departureTime,
      arrivalTime: arrivalTime || schedule.arrivalTime
    });

    // Return success response
    res.json({ message: 'Schedule updated successfully', schedule });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Function to delete a schedule by ID
async function deleteSchedule(req, res) {
  try {
    const { id } = req.params;

    // Find the schedule by ID
    const schedule = await Schedule.findByPk(id);

    // If schedule not found
    if (!schedule) {
      return res.status(404).json({ error: 'Schedule not found' });
    }

    // Delete schedule
    await schedule.destroy();

    // Return success response
    res.json({ message: 'Schedule deleted successfully' });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { createSchedule, getAllSchedules, getScheduleById, updateSchedule, deleteSchedule };
