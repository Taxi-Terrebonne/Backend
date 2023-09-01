const express = require('express');
const router = express.Router();
const vehicleTypeController = require('../controllers/vehicle');
const { protect } = require('../middleware/auth');

// POST /vehicle-types
router.post('/', protect, vehicleTypeController.createVehicleType);
router.get('/', vehicleTypeController.getVehicleTypes);
router.delete('/:id', protect, vehicleTypeController.deleteVehicleType);
module.exports = router;
