const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment');
const { protect } = require('../middleware/auth');

router.post('/', protect, paymentController.createpayment);
router.get('/', paymentController.getpayment);
router.put('/:id', protect, paymentController.updatepayments);
router.delete('/:id', protect, paymentController.deletepayment);
module.exports = router;
