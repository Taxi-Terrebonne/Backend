const express = require('express');
const router = express.Router();
const Hero = require('../controllers/hero');
const { protect } = require('../middleware/auth');

router.post('/', protect, Hero.createTextItem);

router.get('/', Hero.getAllTextItems);

router.put('/:id', protect, Hero.updateTextItem);

router.delete('/:id', protect, Hero.deleteTextItem);

module.exports = router;
