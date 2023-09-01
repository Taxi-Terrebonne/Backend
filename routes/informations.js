const express = require('express');
const router = express.Router();
const textItemsController = require('../controllers/informations');
const { protect } = require('../middleware/auth');

router.post('/', protect, textItemsController.createTextItem);

router.get('/', textItemsController.getAllTextItems);

router.put('/:id', protect, textItemsController.updateTextItem);

router.delete('/:id', protect, textItemsController.deleteTextItem);

module.exports = router;
