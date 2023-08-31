require("dotenv").config();
const mongoose = require("mongoose");
const connection = require("./config/db");
const express = require("express");
const app = express();
const Auth = require("./routes/auth")
const reservationsRouter = require('./routes/reservation');
const vehicleTypeRoutes = require('./routes/vehicle');
const testimonialsRoutes = require('./routes/testimonials');
const informations = require('./routes/informations');
const services = require('./routes/services');
const payment = require('./routes/payment');
const contact = require('./routes/contact');
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

const conn = mongoose.connection;

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));