const Razorpay = require('razorpay');
const crypto = require('crypto');
require('dotenv').config();

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create a new Razorpay order
const createOrder = async (req, res) => {
    try {
        console.log("Create order request received:", req.body);
        const { amount, description } = req.body;

        // Get name from form data
        const name = req.body.name || 'Customer';

        // Get email from body or use default
        const email = req.body.email || "user@example.com";

        // Validate required fields
        if (!amount) {
            console.log("Missing required field: amount");
            return res.status(400).json({ success: false, msg: "Missing required field: amount" });
        }

        const options = {
            amount: amount * 100, // Convert to paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        };

        console.log("Creating Razorpay order with options:", options);
        razorpayInstance.orders.create(options, (err, order) => {
            if (!err) {
                console.log("Razorpay order created successfully:", order);
                res.status(200).json({
                    success: true,
                    msg: "Order Created",
                    order_id: order.id,
                    amount: amount * 100,
                    key_id: process.env.RAZORPAY_KEY_ID,
                    name,
                    email,
                    description: description || "Event Registration Fee"
                });
            } else {
                console.error("Razorpay order creation failed:", err);
                res.status(500).json({ success: false, msg: "Payment initiation failed: " + err.message });
            }
        });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ success: false, msg: "Server Error: " + error.message });
    }
};

// Verify Razorpay payment signature
const verifyPayment = (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userData } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest("hex");

        if (expectedSignature === razorpay_signature) {
            console.log("Payment verified successfully:", { razorpay_payment_id, razorpay_order_id, userData });

            res.status(200).json({
                success: true,
                msg: "Payment verified successfully",
                order_id: razorpay_order_id,
                payment_id: razorpay_payment_id
            });
        } else {
            res.status(400).json({ success: false, msg: "Payment verification failed" });
        }
    } catch (error) {
        console.error("Error verifying payment:", error);
        res.status(500).json({ success: false, msg: "Server Error" });
    }
};

module.exports = {
    createOrder,
    verifyPayment
};