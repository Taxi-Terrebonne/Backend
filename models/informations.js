const mongoose = require('mongoose');

const InformaionsSchema = new mongoose.Schema({
  title: String,
  desc: String,
  note: String,
});

const Informaions = mongoose.model('Informaions', InformaionsSchema);

module.exports = Informaions;
