const nodemailer = require('nodemailer');
const Contact = require('../models/contact');
const dotenv = require('dotenv');
const Notification = require('./notfication');
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.email,
    pass: process.env.key,
  },
});

const sendContactEmail = async (req, res) => {
  const { name, phoneNumber, email, note } = req.body;

  if (!name || !phoneNumber || !email || !note) {
    return res.status(400).json({ error: 'Veuillez remplir tous les champs obligatoires.' });
  }

  try {
    const newContact = await Contact.create({ name, phoneNumber, email, note });
    const notificationMessage = `New message from ${name}.`;
    await Notification.createNotification(notificationMessage, 'Contact Us.', 'ContactUs');

    const mailOptions = {
      from: `New Contact Form from ${email}`,
      to: process.env.email,
      subject: `New Contact Form from ${email}`,
      html: `
        <p>Name: ${name}</p>
        <p>Phone Number: ${phoneNumber}</p>
        <p>Email: ${email}</p>
        <p>Message: ${note}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'Email sent and contact created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while sending the email and creating the contact' });
  }
};

const getContactSubmissions = async (req, res) => {
  try {
    const contactSubmissions = await Contact.find();
    res.status(200).json(contactSubmissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching contact submissions' });
  }
};

const clearAllContactSubmissions = async (req, res) => {
  try {
    await Contact.deleteMany({}); // Delete all contact submissions
    res.status(200).json({ message: 'All contact submissions cleared successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while clearing all contact submissions' });
  }
};

const deleteContactSubmissionById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedContact = await Contact.findByIdAndDelete(id); // Find and delete the contact by its ID
    if (!deletedContact) {
      return res.status(404).json({ error: 'Contact submission not found' });
    }

    res.status(200).json({ message: 'Contact submission deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the contact submission' });
  }
};

module.exports = { sendContactEmail, getContactSubmissions, clearAllContactSubmissions, deleteContactSubmissionById };
