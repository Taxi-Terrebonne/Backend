const Services = require('../models/services');

async function createservices(req, res) {
  try {
    const { name } = req.body;
    const services = new Services({ name });
    await services.save();
    res.status(201).json(services);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getservices(req, res) {
  try {
    const servicess = await Services.find();
    res.status(200).json(servicess);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function updateservices(req, res) {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedService = await Services.findByIdAndUpdate(
      id,
      { name },
      { new: true } // Return the updated service
    );

    if (!updatedService) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json(updatedService);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function deleteservices(req, res) {
  try {
    const { id } = req.params;
    const deletedservices = await Services.findByIdAndDelete(id);
    if (!deletedservices) {
      return res.status(404).json({ message: 'Vehicle type not found' });
    }
    res.status(200).json({ message: 'Vehicle type deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
module.exports = {
  createservices,
  getservices,
  deleteservices,
  updateservices
};
