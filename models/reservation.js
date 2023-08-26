const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  email: String,
  vehicleType: String,
  dateTime: Date,
  departureAddress: String,
  arrivalAddress: String,
  note: String,
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
