const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservation');

router.post('/create', reservationController.createReservation);
router.get('/get', reservationController.getReservations);
router.get('/getE', reservationController.getExpiredReservations);


module.exports = router;
