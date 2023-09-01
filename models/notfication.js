// models/Notification.js
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  action: String,
  context: String,
  path: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isCleared: {
    type: Boolean,
    default: false,
  },
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
