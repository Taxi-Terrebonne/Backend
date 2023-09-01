// controllers/notificationController.js
const Notification = require('../models/notfication');

exports.createNotification = async (action, context, path) => {
  try {
    const newNotification = new Notification({
      action,
      context,
      path
    });
    await newNotification.save();
  } catch (error) {
    console.error('Error creating notification:', error);
  }
};

exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort('-createdAt');
    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'An error occurred while fetching notifications' });
  }
};

exports.deleteAllNotifications = async () => {
  try {
    await Notification.deleteMany();
  } catch (error) {
    console.error('Error deleting notifications:', error);
    throw error;
  }
};