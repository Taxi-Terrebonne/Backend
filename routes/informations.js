const express = require('express');
const router = express.Router();
const textItemsController = require('../controllers/informations');

router.post('/', textItemsController.createTextItem);

router.get('/', textItemsController.getAllTextItems);

router.put('/:id', textItemsController.updateTextItem);

router.delete('/:id', textItemsController.deleteTextItem);

module.exports = router;
