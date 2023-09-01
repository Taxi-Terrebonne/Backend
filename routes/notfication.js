// routes/notificationRoutes.js
const express = require('express');
const notificationController = require('../controllers/notfication');

const router = express.Router();

router.post('/create', async (req, res) => {
  const { action, context, path } = req.body;
  await notificationController.createNotification(action, context, path);
  res.json({ message: 'Notification created successfully' });
});

// Route to fetch notifications
router.get('/', async (req, res) => {
  await notificationController.getNotifications(req, res);
});

router.post('/delete-all', async (req, res) => {
  try {
    // Send a request to your backend to delete all notifications from the database
    await notificationController.deleteAllNotifications();

    res.status(200).json({ message: 'All notifications deleted successfully' });
  } catch (error) {
    console.error('Error deleting notifications:', error);
    res.status(500).json({ error: 'An error occurred while deleting notifications' });
  }
});

module.exports = router;
