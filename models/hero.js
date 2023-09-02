const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
  Lefttitile: String,
  Leftdesc: String,
  Righttitle: String,
  Rightdesc: String,
});

const hero = mongoose.model('hero', heroSchema);

module.exports = hero;
