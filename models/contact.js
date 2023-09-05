const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  email: String,
  note: String,
  createdAt: { type: Date, default: Date.now },
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;