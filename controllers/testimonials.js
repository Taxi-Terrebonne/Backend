const Testimonial = require('../models/testimonials');

exports.getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createTestimonial = async (req, res) => {
  try {
    const { name, message } = req.body;
    const testimonial = new Testimonial({ name, message });
    await testimonial.save();
    res.status(201).json({ message: 'Testimonial created successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
};

exports.editTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, message } = req.body;

    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      id,
      { name, message },
      { new: true }
    );

    if (!updatedTestimonial) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }

    res.json(updatedTestimonial);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
};

exports.deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTestimonial = await Testimonial.findByIdAndDelete(id);

    if (!deletedTestimonial) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }

    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
};
