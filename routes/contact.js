// routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact');
const { protect } = require('../middleware/auth');

router.post('/', contactController.sendContactEmail);
router.get('/', protect, contactController.getContactSubmissions);

module.exports = router;
