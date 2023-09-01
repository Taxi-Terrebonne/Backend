const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  name: String,
});

const Payment = mongoose.model('Payment', PaymentSchema);

module.exports = Payment;