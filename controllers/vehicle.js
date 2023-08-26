const VehicleType = require('../models/vehicle');

async function createVehicleType(req, res) {
  try {
    const { name } = req.body;
    const vehicleType = new VehicleType({ name });
    await vehicleType.save();
    res.status(201).json(vehicleType);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getVehicleTypes(req, res) {
  try {
    const vehicleTypes = await VehicleType.find();
    res.status(200).json(vehicleTypes);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function deleteVehicleType(req, res) {
  try {
    const { id } = req.params;
    const deletedVehicleType = await VehicleType.findByIdAndDelete(id);
    if (!deletedVehicleType) {
      return res.status(404).json({ message: 'Vehicle type not found' });
    }
    res.status(200).json({ message: 'Vehicle type deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
module.exports = {
  createVehicleType,
  getVehicleTypes,
  deleteVehicleType
};
