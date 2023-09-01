const Payment = require('../models/payment');

async function createpayment(req, res) {
  try {
    const { name } = req.body;
    const payment = new Payment({ name });
    await payment.save();
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getpayment(req, res) {
  try {
    const payments = await Payment.find();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function updatepayments(req, res) {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedPayments = await Payment.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!updatedPayments) {
      return res.status(404).json({ message: 'Payment Methode not found' });
    }

    res.status(200).json(updatedPayments);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function deletepayment(req, res) {
  try {
    const { id } = req.params;
    const deletedpayment = await Payment.findByIdAndDelete(id);
    if (!deletedpayment) {
      return res.status(404).json({ message: 'Payment Methode not found' });
    }
    res.status(200).json({ message: 'Payment Methode deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
module.exports = {
  createpayment,
  getpayment,
  deletepayment,
  updatepayments
};
