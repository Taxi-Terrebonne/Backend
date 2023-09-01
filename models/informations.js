const mongoose = require('mongoose');

const InformaionsSchema = new mongoose.Schema({
  title: String,
  desc: String,
  note: String,
  footer: String,
});

const Informaions = mongoose.model('Informaions', InformaionsSchema);

module.exports = Informaions;
