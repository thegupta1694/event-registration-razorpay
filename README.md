# Event Registration System with Razorpay

A full-stack event registration system with payment integration using Razorpay and data storage in Firebase.

## Features

- User registration form
- T-shirt size selection
- Payment processing via Razorpay
- Data storage in Firebase
- Email confirmation

## Technologies Used

- Node.js with Express
- EJS for templating
- Razorpay for payment processing
- Firebase for data storage and authentication
- Deployed on Vercel

## Local Development

1. Clone the repository:
   ```
   git clone https://github.com/your-username/event-registration-razorpay.git
   cd event-registration-razorpay
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   FIREBASE_API_KEY=your_firebase_api_key
   FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   FIREBASE_PROJECT_ID=your_firebase_project_id
   FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   FIREBASE_APP_ID=your_firebase_app_id
   FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Visit `http://localhost:3000` in your browser.

## Deployment

This project is set up for deployment on Vercel. Simply connect your GitHub repository to Vercel and ensure all environment variables are configured.
