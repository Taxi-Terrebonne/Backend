const TextItem = require('../models/informations');

exports.createTextItem = async (req, res) => {
  const { title, desc, note } = req.body;

  try {
    const newTextItem = new TextItem({
      title,
      desc,
      note,
    });
    await newTextItem.save();
    res.status(201).json(newTextItem);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getAllTextItems = async (req, res) => {
  try {
    const textItems = await TextItem.find();
    res.json(textItems);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


exports.updateTextItem = async (req, res) => {
  const { id } = req.params;
  const { title, desc, note } = req.body;

  try {
    const textItem = await TextItem.findByIdAndUpdate(id, {
      title,
      desc,
      note,
    });
    if (!textItem) {
      return res.status(404).json({ error: 'Text item not found' });
    }
    res.json(textItem);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteTextItem = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTextItem = await TextItem.findByIdAndDelete(id);
    if (!deletedTextItem) {
      return res.status(404).json({ error: 'Text item not found' });
    }
    res.json({ message: 'Text item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
