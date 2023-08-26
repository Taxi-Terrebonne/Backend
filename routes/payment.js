const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment');

router.post('/', paymentController.createpayment);
router.get('/', paymentController.getpayment);
router.delete('/:id', paymentController.deletepayment);
module.exports = router;
