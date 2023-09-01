const nodemailer = require('nodemailer');
const Reservation = require('../models/reservation');
const Notification = require('./notfication');
const dotenv = require('dotenv')
dotenv.config()
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.email,
    pass: process.env.key,
  },
});

exports.createReservation = async (req, res) => {
  try {
    const newReservationData = req.body;

    if (
      !newReservationData.name ||
      !newReservationData.email ||
      !newReservationData.dateTime ||
      !newReservationData.departureAddress ||
      !newReservationData.arrivalAddress ||
      !newReservationData.phoneNumber ||
      !newReservationData.vehicleType
    ) {
      return res.status(400).json({ error: 'Veuillez remplir tous les champs obligatoires.' });
    }

    const newReservation = new Reservation(newReservationData);
    await newReservation.save();
    // Create a notification for the new reservation
    const notificationMessage = `${newReservation.name} made a reservation.`;
    await Notification.createNotification(notificationMessage, 'Resrvation', 'reservations');


    const mailOptions = {
      from: process.env.email,
      to: newReservation.email,
      subject: 'Taxi Terrebonne Reservation',
      html: `
        <p>Dear ${newReservation.name},</p>
    
        <p>We're delighted to confirm your reservation with <strong>Taxi Terrebonne</strong>. Here are the details:</p>
        <p><strong>Phone Number:</strong> ${newReservation.phoneNumber}.</p>

        <p><strong>Date and Time:</strong> ${new Date(newReservation.dateTime).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      })}.</p>
       <p><strong>Departure Address:</strong> ${newReservation.departureAddress}.</p>
        <p><strong>Arrival Address:</strong> ${newReservation.arrivalAddress}.</p>
        <p><strong>Vehicle Type:</strong> ${newReservation.vehicleType}.</p>
    
        <p>Thank you for choosing us. If you have any questions or need assistance, feel free to <a href="tel:+14505163131">call us</a> at +1 (450) 516-3131.</p>
    
        <p>We look forward to serving you and hope to welcome you back soon.</p>
    
        <p>Best regards,<br><strong>Taxi Terrebonne</strong</p>
      `,
    };


    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.status(201).json({ message: 'Reservation created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating reservation' });
  }
};


exports.getReservations = async (req, res) => {
  try {
    const currentTime = new Date();
    const reservations = await Reservation.find();

    const activeReservations = reservations.filter((reservation) => {
      const reservationTime = new Date(reservation.dateTime);
      return reservationTime > currentTime;
    });

    res.status(200).json(activeReservations);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching reservations' });
  }
};



exports.getExpiredReservations = async (req, res) => {
  try {
    const currentTime = new Date();
    const reservations = await Reservation.find();

    const expiredReservations = reservations.filter((reservation) => {
      const reservationTime = new Date(reservation.dateTime);
      return reservationTime <= currentTime;
    });

    res.status(200).json(expiredReservations);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching expired reservations' });
  }
};

exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching all reservations' });
  }
};
