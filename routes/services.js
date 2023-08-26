const express = require('express');
const router = express.Router();
const servicesController = require('../controllers/services');

router.post('/', servicesController.createservices);
router.get('/', servicesController.getservices);
router.put('/:id', servicesController.updateservices);
router.delete('/:id', servicesController.deleteservices);
module.exports = router;
