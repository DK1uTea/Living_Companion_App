// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQjpRR7Vv-kQdJYrTz408kITBdrghOoSU",
  authDomain: "living-companion-app.firebaseapp.com",
  projectId: "living-companion-app",
  storageBucket: "living-companion-app.appspot.com",
  messagingSenderId: "991412121030",
  appId: "1:991412121030:web:4493f48d1665c2c09f16c7",
  measurementId: "G-XLPD1S4LJ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export {auth, googleProvider, signInWithPopup};