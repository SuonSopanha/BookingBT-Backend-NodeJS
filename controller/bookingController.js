const Booking = require("../db/models/Booking");
const Service = require("../db/models/Service");
const User = require("../db/models/User");
const Driver = require("../db/models/Driver");
// Function to create a booking
async function createBooking(req, res) {
  try {
    const {
      serviceId,
      pickupLocation,
      dropoffLocation,
      pickupTime,
      bookingStatus,
      bookingDate,
      seatType,
      userContactNumber,
      seatAmount,
      totalFare,
      description,
    } = req.body;

    const userId = req.user.id;
    //find Service by ServiceID

    const service = await Service.findByPk(serviceId);

    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    const driverID = service.driverId;

    // Create the booking
    const booking = await Booking.create({
      userId: userId,
      serviceId: serviceId,
      driverId: driverID,
      pickupLocation,
      dropoffLocation,
      pickupTime,
      bookingStatus,
      bookingDate,
      seatType,
      userContactNumber,
      seatAmount,
      totalFare,
      description,
    });

    // Return success response
    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Function to get all bookings
async function getAllBookings(req, res) {
  try {
    // Find all bookings
    const bookings = await Booking.findAll();

    // Return bookings
    res.json(bookings);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Function to get a single booking by ID
async function getBookingById(req, res) {
  try {
    const { id } = req.params;

    // Find the booking by ID
    const booking = await Booking.findByPk(id);

    // If booking not found
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // Return booking
    res.json(booking);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Function to update a booking by ID
async function updateBooking(req, res) {
  try {
    const params = req.params.id;
    const id = parseInt(params);

    const {
      pickupLocation,
      dropoffLocation,
      pickupTime,
      dropoffTime,
      bookingStatus,
      bookingDate,
      seatType,
      userContactNumber,
      seatAmount,
      totalFare,
    } = req.body;

    // Find the booking by ID
    let booking = await Booking.findByPk(id);

    // If booking not found
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // Update booking information
    booking = await booking.update({
      pickupLocation,
      dropoffLocation,
      pickupTime,
      dropoffTime,
      bookingStatus,
      bookingDate,
      seatType,
      userContactNumber,
      seatAmount,
      totalFare,
    });

    // Return success response
    res.json({ message: "Booking updated successfully", booking });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Function to delete a booking by ID
async function deleteBooking(req, res) {
  try {
    const { id } = req.params;

    // Find the booking by ID
    const booking = await Booking.findByPk(id);

    // If booking not found
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // Delete booking
    await booking.destroy();

    // Return success response
    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getReciptById(req, res) {
  try {
    const { id } = req.params;

    // Find the booking by ID
    const booking = await Booking.findByPk(id);

    // If booking not found
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // Find the user by userId
    const user = await User.findByPk(booking.userId, {
      attributes: ["fullName"], // Adjust based on your User model attributes
    });

    // Find the driver by driverId
    const driver = await Driver.findByPk(booking.driverId, {
      attributes: ["firstName", "lastName", "contactNumber"], // Adjust based on your Driver model attributes
    });

    const service = await Service.findByPk(booking.serviceId, {
      attributes: ["location", "destination", "category"],
    });

    // Combine the results
    const result = {
      ...booking.toJSON(),
      userFullName: user ? user.fullName : null,
      driverFirstName: driver ? driver.firstName : null,
      driverLastName: driver ? driver.lastName : null,
      driverContactNumber: driver ? driver.contactNumber : null,
      location: service ? service.location : null,
      destination: service ? service.destination : null,
      category: service ? service.category : null,
    };

    // Return the combined result
    res.json(result);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getMyBooking(req, res) {
  const userId = req.user.id;

  try {
    // Find all bookings where userId matches the user's id
    const bookings = await Booking.findAll({
      where: { userId },
      order: [["createdAt", "ASC"]],
    });

    // If no bookings found, return a message
    if (!bookings.length) {
      return res
        .status(404)
        .json({ message: "No bookings found for this user" });
    }

    // Fetch the associated service for each booking
    const bookingsWithServices = await Promise.all(
      bookings.map(async (booking) => {
        const service = await Service.findOne({
          where: { id: booking.serviceId },
        });
        return {
          ...booking.toJSON(), // Convert the booking instance to a plain object
          service, // Include the service details
        };
      })
    );

    // Return the bookings with associated services
    res.json(bookingsWithServices);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updateBookingStatus(req, res) {
  try {
    const params = req.params.id;
    const id = parseInt(params);

    const { bookingStatus } = req.body;

    // Find the booking by ID
    let booking = await Booking.findByPk(id);

    // If booking not found
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // Update booking information
    booking = await booking.update({
      bookingStatus,
    });

    // Return success response
    res.json({ message: "Booking updated successfully", booking });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getDriverBooking(req, res) {
  const { id } = req.params;

  try {
    // Find all bookings where driverId matches the provided id, ordered by createdAt in DESC
    const bookings = await Booking.findAll({
      where: { driverId: id },
      order: [['createdAt', 'DESC']],
    });

    // If no bookings found, return a message
    if (!bookings.length) {
      return res
        .status(404)
        .json({ message: "No bookings found for this Driver" });
    }

    // Fetch the associated service and user for each booking
    const bookingsWithServices = await Promise.all(
      bookings.map(async (booking) => {
        const service = await Service.findOne({
          where: { id: booking.serviceId },
        });

        const user = await User.findOne({
          where: { id: booking.userId },
        });

        return {
          ...booking.toJSON(), // Convert the booking instance to a plain object
          service, 
          user, // Include the service and user details
        };
      })
    );

    // Return the bookings with associated services
    res.json(bookingsWithServices);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  getReciptById,
  getMyBooking,
  updateBookingStatus,
  getDriverBooking,
};
