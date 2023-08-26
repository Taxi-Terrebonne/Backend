const express = require('express');
const router = express.Router();
const testimonialsController = require('../controllers/testimonials');

router.get('/', testimonialsController.getAllTestimonials);
router.post('/', testimonialsController.createTestimonial);
router.put('/:id', testimonialsController.editTestimonial);
router.delete('/:id', testimonialsController.deleteTestimonial);

module.exports = router;
