const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const { createNotification, getAllNotifications, getNotificationById, updateNotification, deleteNotification } = require('../controller/notificationController');

const router = express.Router();

// Middleware to authenticate token for all routes
router.use(authenticateToken);

// Routes
router.post('/', createNotification); // Create a new notification
router.get('/', getAllNotifications); // Get all notifications
router.get('/:id', getNotificationById); // Get a single notification by ID
router.put('/:id', updateNotification); // Update a notification by ID
router.delete('/:id', deleteNotification); // Delete a notification by ID

module.exports = router;
