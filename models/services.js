const mongoose = require('mongoose');

const ServicesSchema = new mongoose.Schema({
  name: String,
});

const Services = mongoose.model('Services', ServicesSchema);

module.exports = Services;