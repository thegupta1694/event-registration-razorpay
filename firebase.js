const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');
const { getAuth, onAuthStateChanged, signInAnonymously } = require('firebase/auth');
require('dotenv').config();

// Firebase Configuration
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

async function ensureAuth() {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                resolve(user);
            } else {
                try {
                    const userCredential = await signInAnonymously(auth);
                    resolve(userCredential.user);
                } catch (error) {
                    console.error("Anonymous sign-in error:", error);
                    reject(error);
                }
            }
        });
    });
}

async function saveFormData(formData) {
    try {
        const user = await ensureAuth();
        const userId = user.uid;

        const docRef = await addDoc(collection(db, "registrations"), {
            ...formData,
            userId: userId,
            timestamp: new Date()
        });

        console.log("Registration saved successfully with ID:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error saving registration:", error);
        throw error;
    }
}

function getPublicFirebaseConfig() {
    return {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID
    };
}

module.exports = { db, auth, saveFormData, getPublicFirebaseConfig };
