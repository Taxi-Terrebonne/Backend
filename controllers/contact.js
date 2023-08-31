// controllers/contactController.js
const nodemailer = require('nodemailer');
const Contact = require('../models/contact');
const dotenv = require('dotenv')
dotenv.config()

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'TaxiTerrebonne.ca@gmail.com',
    pass: process.env.key,
  },
});
const sendContactEmail = async (req, res) => {
  const { name, phoneNumber, email, note } = req.body;

  if (!name || !phoneNumber || !email || !note) {
    return res.status(400).json({ error: 'Please fill all the required fields' });
  }

  try {
    const newContact = await Contact.create({ name, phoneNumber, email, note });

    const mailOptions = {
      from: 'TaxiTerrebonne.ca@gmail.com',
      to: 'TaxiTerrebonne.ca@gmail.com',
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
    const contactSubmissions = await Contact.find(); // Assuming you're using Mongoose or a similar library
    res.status(200).json(contactSubmissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching contact submissions' });
  }
};

module.exports = { sendContactEmail, getContactSubmissions };
