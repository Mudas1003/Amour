// frontend/src/firebase.js
// Firebase v9 modular SDK - Vite-friendly
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";   // 🔥 added
import { getStorage } from "firebase/storage";       // 📂 added

/*
  IMPORTANT:
  - For Vite, env vars must start with VITE_*
  - You can later move all hardcoded values into .env files.
*/

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBZvIc5-26DSC6K4jl7eHKiBzMh_v69_i4",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "amour-14a8e.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "amour-14a8e",

  // ❗ FIXED: storageBucket must ALWAYS end with .appspot.com, not firebasestorage.app
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "amour-14a8e.appspot.com",

  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "30284614106",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:30284614106:web:c56b81453c987853b518e3",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-8YN3TTJG59",
};

// -------------------------------------------------------------------
// Initialize Firebase
// -------------------------------------------------------------------
const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);

// Firestore (database)
export const db = getFirestore(app);

// Storage (for photos, videos, etc.)
export const storage = getStorage(app);

// Analytics (optional, browser-only)
let analytics;
try {
  if (typeof window !== "undefined" && firebaseConfig.measurementId) {
    analytics = getAnalytics(app);
  }
} catch (e) {
  console.warn("Firebase analytics not initialized:", e?.message || e);
}

export { analytics };
export default app;
