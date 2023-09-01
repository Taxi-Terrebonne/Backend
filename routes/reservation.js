const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservation');
const { protect } = require('../middleware/auth');

router.post('/create', reservationController.createReservation);
router.get('/get', protect, reservationController.getReservations);
router.get('/getE', protect, reservationController.getExpiredReservations);

router.get('/', protect, reservationController.getAllReservations);

module.exports = router;
