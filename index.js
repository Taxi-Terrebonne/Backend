require("dotenv").config();
const mongoose = require("mongoose");
const connection = require("./config/db");
const express = require("express");
const app = express();
const Auth = require("./routes/auth");
const reservationsRouter = require('./routes/reservation');
const vehicleTypeRoutes = require('./routes/vehicle');
const testimonialsRoutes = require('./routes/testimonials');
const informations = require('./routes/informations');
const services = require('./routes/services');
const payment = require('./routes/payment');
const contact = require('./routes/contact');
const notificationRoutes = require('./routes/notfication');
const Hero = require('./routes/hero');
const placesRoute = require('./routes/places');

const cors = require('cors');
const path = require('path');
mongoose.set("strictQuery", true);

app.use(cors());

connection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(Auth);
app.use('/reservations', reservationsRouter);
app.use('/vehicle', vehicleTypeRoutes);
app.use('/testimonials', testimonialsRoutes);
app.use('/informations', informations);
app.use('/services', services);
app.use('/payment', payment);
app.use('/contact', contact);
app.use('/notifications', notificationRoutes);
app.use('/hero', Hero)
app.use('/places', placesRoute);

const port = process.env.PORT || 8080;

const server = require('http').createServer(app); 

const { setupSocket } = require('./middleware/socket'); 

const io = setupSocket(server); 

server.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

module.exports = io;
