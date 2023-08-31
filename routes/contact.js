// routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact');

router.post('/', contactController.sendContactEmail);
router.get('/', contactController.getContactSubmissions);

module.exports = router;
