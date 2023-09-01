const express = require('express');
const router = express.Router();
const testimonialsController = require('../controllers/testimonials');
const { protect } = require('../middleware/auth');

router.get('/', testimonialsController.getAllTestimonials);
router.post('/', protect, testimonialsController.createTestimonial);
router.put('/:id', protect, testimonialsController.editTestimonial);
router.delete('/:id', protect, testimonialsController.deleteTestimonial);

module.exports = router;
