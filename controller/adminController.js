const { Op, fn, col, literal } = require("sequelize");
const User = require("../db/models/user");
const Booking = require("../db/models/booking");
const Driver = require("../db/models/driver");

async function getStatistics(req, res) {
  try {
    console.log("Counting total users...");
    // Get total user count
    const totalUsers = await User.count();
    console.log("Total users counted:", totalUsers);

    // Get new user count in a week
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const newUsersInWeek = await User.count({
      where: {
        createdAt: {
          [Op.gte]: weekAgo,
        },
      },
    });
    console.log("New users in week:", newUsersInWeek);

    // Get new driver count in a week
    const newDriversInWeek = await Driver.count({
      where: {
        createdAt: {
          [Op.gte]: weekAgo,
        },
      },
    });
    console.log("New drivers in week:", newDriversInWeek);

    // Get today's booking count
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of today
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // Set to start of tomorrow

    const todayBookings = await Booking.count({
      where: {
        createdAt: {
          [Op.gte]: today,
          [Op.lt]: tomorrow,
        },
      },
    });
    console.log("Today's bookings:", todayBookings);

    // Get booking data for each month in the past year
    const yearAgo = new Date();
    yearAgo.setFullYear(yearAgo.getFullYear() - 1);

    const monthlyBookings = await Booking.findAll({
      attributes: [
        [fn("date_trunc", "month", col("createdAt")), "month"],
        [fn("to_char", col("createdAt"), "Month"), "monthName"],
        [fn("COUNT", "*"), "count"],
      ],
      where: {
        createdAt: {
          [Op.gte]: yearAgo,
        },
      },
      group: [
        literal("date_trunc('month', \"createdAt\")"),
        literal("to_char(\"createdAt\", 'Month')"),
      ],
      order: [[literal("date_trunc('month', \"createdAt\")"), "ASC"]],
    });
    console.log("Monthly bookings retrieved:", monthlyBookings.length);

    // Format the monthly bookings
    const monthlyBookingsFormatted = monthlyBookings.map((booking) => ({
      month: booking.get("monthName").trim(), // Trimming the month name to remove any extra spaces
      count: booking.get("count"),
    }));

    // Combine all statistics into a single result object
    const statistics = {
      totalUsers,
      newUsersInWeek,
      newDriversInWeek,
      todayBookings,
      monthlyBookings: monthlyBookingsFormatted,
    };

    // Send the statistics as a JSON response
    res.json(statistics);
  } catch (error) {
    console.error("Error fetching statistics:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { getStatistics };
