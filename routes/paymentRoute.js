const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Routes
router.post('/create-order', paymentController.createOrder);
router.post('/verify-payment', paymentController.verifyPayment);

module.exports = router;