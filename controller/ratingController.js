const Rating = require("../db/models/Rating");
const Booking = require("../db/models/Booking");
const Driver = require("../db/models/Driver");
const User = require("../db/models/User");
const { where } = require("sequelize");

// Function to create a rating
async function createRating(req, res) {
  try {
    const {
      DriverId,
      ServiceId,
      BookingId,
      rating,
      feedbackText,
      feedbackDate,
    } = req.body;

    const userId = req.user.id;

    // Check if the user has booked this driver before
    const userBooking = await Booking.findOne({
      where: { userId: userId, driverId: DriverId },
    });

    if (!userBooking) {
      return res
        .status(403)
        .json({
          error:
            "No permission to rate driver. You have never booked this driver.",
        });
    }

    // Create the rating
    const newRating = await Rating.create({
      userId,
      driverId: DriverId,
      serviceId: ServiceId,
      bookingId: BookingId,
      rating,
      feedbackText,
      feedbackDate,
    });

    // Fetch all ratings for the driver
    const allRatings = await Rating.findAll({ where: { driverId: DriverId } });

    // Calculate the average rating
    const totalRatings = allRatings.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = totalRatings / allRatings.length;

    // Update the driver's average rating
    await Driver.update(
      { averageRating: averageRating },
      { where: { id: DriverId } }
    );

    // Return success response
    res
      .status(201)
      .json({ message: "Rating created successfully", rating: newRating });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Function to get all ratings
async function getAllRatings(req, res) {
  try {
    // Find all ratings
    const ratings = await Rating.findAll();

    // Return ratings
    res.json(ratings);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Function to get a single rating by ID
async function getRatingById(req, res) {
  try {
    const { id } = req.params;

    // Find the rating by ID
    const rating = await Rating.findByPk(id);

    // If rating not found
    if (!rating) {
      return res.status(404).json({ error: "Rating not found" });
    }

    // Return rating
    res.json(rating);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Function to update a rating by ID
async function updateRating(req, res) {
  try {
    const { id } = req.params;
    const {
      UserId,
      DriverId,
      ServiceId,
      BookingId,
      rating,
      feedbackText,
      feedbackDate,
    } = req.body;

    // Find the rating by ID
    let foundRating = await Rating.findByPk(id);

    // If rating not found
    if (!foundRating) {
      return res.status(404).json({ error: "Rating not found" });
    }

    // Update rating information
    foundRating = await foundRating.update({
      UserId,
      DriverId,
      ServiceId,
      BookingId,
      rating,
      feedbackText,
      feedbackDate,
    });

    // Return success response
    res.json({ message: "Rating updated successfully", rating: foundRating });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Function to delete a rating by ID
async function deleteRating(req, res) {
  try {
    const { id } = req.params;

    // Find the rating by ID
    const foundRating = await Rating.findByPk(id);

    // If rating not found
    if (!foundRating) {
      return res.status(404).json({ error: "Rating not found" });
    }

    // Delete rating
    await foundRating.destroy();

    // Return success response
    res.json({ message: "Rating deleted successfully" });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}


async function getRatingByDriver(req, res) {
  try {
    const { id } = req.params;

    // Fetch all ratings for the given driver ID
    const ratings = await Rating.findAll({ where: { driverId: id } });
    
    // If no ratings found, return a 404 response
    if (!ratings || ratings.length === 0) {
      return res.status(404).json({ error: "Ratings not found" });
    }

    // Extract all unique user IDs from the ratings
    const userIds = [...new Set(ratings.map(rating => rating.userId))];

    // Fetch user data for each user ID
    const users = await User.findAll({
      where: {
        id: userIds,
      },
      attributes: ['id', 'fullName', 'email','photoURL'], // Specify the attributes you need
    });

    // Create a user map for quick lookup
    const userMap = users.reduce((acc, user) => {
      acc[user.id] = user;
      return acc;
    }, {});

    // Attach user data to each rating
    const ratingsWithUserData = ratings.map(rating => ({
      ...rating.toJSON(),
      user: userMap[rating.userId],
    }));

    // Send the response with the ratings and attached user data
    res.json(ratingsWithUserData);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  createRating,
  getAllRatings,
  getRatingById,
  updateRating,
  deleteRating,
  getRatingByDriver,
};
