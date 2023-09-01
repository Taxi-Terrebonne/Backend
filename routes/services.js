const express = require('express');
const router = express.Router();
const servicesController = require('../controllers/services');
const { protect } = require('../middleware/auth');

router.post('/', protect, servicesController.createservices);
router.get('/', servicesController.getservices);
router.put('/:id', protect, servicesController.updateservices);
router.delete('/:id', protect, servicesController.deleteservices);
module.exports = router;
