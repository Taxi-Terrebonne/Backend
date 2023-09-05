// routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact');
const { protect } = require('../middleware/auth');

router.post('/', contactController.sendContactEmail);

router.get('/', protect, contactController.getContactSubmissions);

router.delete('/clear', protect, contactController.clearAllContactSubmissions);

router.delete('/:id', protect, contactController.deleteContactSubmissionById);

module.exports = router;
