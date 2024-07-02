const Notification = require("../db/models/Notification");
const Driver = require("../db/models/Driver");

// Function to create a notification
async function createNotification(req, res) {
  try {
    const {
      UserID,
      driverId,
      bookingId,
      notificationType,
      notificationMessage,
      notificationStatus,
      notificationDate,
    } = req.body;
    const userId = req.user.id;
    // Create the notification
    const notification = await Notification.create({
      userId : UserID ? UserID : userId,
      driverId,
      bookingId,
      notificationType,
      notificationMessage,
      notificationStatus,
      notificationDate,
    });

    // Return success response
    res
      .status(201)
      .json({ message: "Notification created successfully", notification });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Function to get all notifications
async function getAllNotifications(req, res) {
  try {
    const userId = req.user.id;

    // Find the user in the Driver table using userId
    const driver = await Driver.findOne({ where: { userId } });

    let notifications;
    if (driver) {
      notifications = await Notification.findAll({
        where: { driverId: driver.id },
        order: [["createdAt", "DESC"]], // Sort notifications in reverse order by creation date
      });
    } else {
      notifications = await Notification.findAll({
        where: { userId },
        order: [["createdAt", "DESC"]], // Sort notifications in reverse order by creation date
      });
    }

    // Return notifications
    res.json(notifications);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
// Function to get a single notification by ID
async function getNotificationById(req, res) {
  try {
    const { id } = req.params;

    // Find the notification by ID
    const notification = await Notification.findByPk(id);

    // If notification not found
    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    // Return notification
    res.json(notification);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Function to update a notification by ID
async function updateNotification(req, res) {
  try {
    const { id } = req.params;
    const {
      notificationType,
      notificationMessage,
      notificationStatus,
      notificationDate,
    } = req.body;

    // Find the notification by ID
    let notification = await Notification.findByPk(id);

    // If notification not found
    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    // Update notification information
    notification = await notification.update({
      notificationType,
      notificationMessage,
      notificationStatus,
      notificationDate,
    });

    // Return success response
    res.json({ message: "Notification updated successfully", notification });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Function to delete a notification by ID
async function deleteNotification(req, res) {
  try {
    const { id } = req.params;

    // Find the notification by ID
    const notification = await Notification.findByPk(id);

    // If notification not found
    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    // Delete notification
    await notification.destroy();

    // Return success response
    res.json({ message: "Notification deleted successfully" });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  createNotification,
  getAllNotifications,
  getNotificationById,
  updateNotification,
  deleteNotification,
};
