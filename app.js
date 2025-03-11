const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const paymentRoute = require('./routes/paymentRoute');
const firebaseService = require('./firebase');

// Load environment variables
dotenv.config();

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use('/api', paymentRoute);

// Serve homepage
app.get('/', (req, res) => {
    res.render('product');
});

// Success page
app.get('/success', (req, res) => {
    // Get registration ID from query parameter if available
    const registrationId = req.query.regId || '';
    res.render('success', { registrationId });
});

// Add endpoint to get Firebase config (without exposing secrets)
app.get('/api/get-firebase-config', (req, res) => {
    res.json(firebaseService.getPublicFirebaseConfig());
});

// Add route to check auth status
app.get('/api/auth-status', (req, res) => {
    res.json({ message: 'Authentication required for database operations' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});