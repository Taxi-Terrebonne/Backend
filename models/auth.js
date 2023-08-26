//code admin
const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
  },
  username: {
    type: String,
    required: [true, 'Please enter an Username'],
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: [true, 'Please enter an Password'],
  },
  userRole: {
    type: String,
    default: 'Admin',
  }
})



//fire a function before doc saved to db

AdminSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt)
  next();
});

const Admin = mongoose.model("admin", AdminSchema);

module.exports = Admin;
