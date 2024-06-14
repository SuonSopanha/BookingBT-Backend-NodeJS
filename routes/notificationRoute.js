const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const { createNotification, getAllNotifications, getNotificationById, updateNotification, deleteNotification } = require('../controller/notificationController');

const router = express.Router();

// Middleware to authenticate token for all routes
router.use(authenticateToken);

// Routes
router.post('/',authenticateToken, createNotification); // Create a new notification
router.get('/',authenticateToken, getAllNotifications); // Get all notifications
router.get('/:id',authenticateToken, getNotificationById); // Get a single notification by ID
router.put('/:id',authenticateToken, updateNotification); // Update a notification by ID
router.delete('/:id',authenticateToken, deleteNotification); // Delete a notification by ID

module.exports = router;
