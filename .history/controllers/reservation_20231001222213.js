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

    const notificationMessage = `${newReservation.name} made a reservation.`;
    await Notification.createNotification(notificationMessage, 'Resrvation', 'reservations');


    const mailOptions = {
      from: process.env.email,
      to: [process.env.email, newReservation.email],      subject: 'Taxi Terrebonne Reservation',
      html: `
      <p>Cher ${newReservation.name},</p>
    
      <p>Nous sommes ravis de confirmer votre réservation avec <strong>Taxi Terrebonne</strong>. Voici les détails :</p>
      <p><strong>Numéro de téléphone :</strong> ${newReservation.phoneNumber}.</p>
      
      <p><strong>Date et heure :</strong> ${new Date(newReservation.dateTime).toLocaleString('fr-FR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      })}.</p>
      <p><strong>Adresse de départ :</strong> ${newReservation.departureAddress}.</p>
      <p><strong>Adresse d'arrivée :</strong> ${newReservation.arrivalAddress}.</p>
      <p><strong>Type de véhicule :</strong> ${newReservation.vehicleType}.</p>
      
      <p>Merci de nous avoir choisis. Si vous avez des questions ou avez besoin d'aide, n'hésitez pas à <a href="tel:+14505163131">nous appeler</a> au +1 (450) 516-3131.</p>
      
      <p>Nous avons hâte de vous servir et espérons vous accueillir à nouveau bientôt.</p>
      
      <p>Cordialement,<br><strong>Taxi Terrebonne</strong></p>      
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

exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching all reservations' });
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


