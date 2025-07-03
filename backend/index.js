require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 5000;
const authRoutes = require('./routes/authRoutes.js');
const connectDb = require('./config/dbConnect.js');
connectDb.connectDB(); // Connect to MongoDB
const passport = require('passport');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const session = require('express-session');

app.use(session({
  secret: process.env.SESSION_SECRET || 'yoursecretkey',
  resave: false,
  saveUninitialized: false
}));

// Initialize Passport and sessions
app.use(passport.initialize());
app.use(passport.session());

// app.use(cors({
//   origin: [
//     'http://localhost:5173',
//     process.env.BASE_URL || 'https://digipin-msu7-git-main-gaurav-sharmas-projects-97aa0168.vercel.app',
//   ],
//   methods: ['GET', 'POST', 'OPTIONS'],
//   credentials: true,
// }));

app.get("/", (req, res) => {
    return res.status(200).json({
        message: "Welcome to LearnStream API"
    })
})

app.use("/api/auth",authRoutes );

app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`);
}) // remove this line if you want to use the app in a serverless environment

//module.exports = app; // Export the app for testing or serverless deployment