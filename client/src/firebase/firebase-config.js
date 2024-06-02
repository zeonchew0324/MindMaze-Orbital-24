// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/app';
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBN_RFLOMZo8hp-26J9Fzqztpo0gMGsr-I",
  authDomain: "mind-maze-8dc62.firebaseapp.com",
  projectId: "mind-maze-8dc62",
  storageBucket: "mind-maze-8dc62.appspot.com",
  messagingSenderId: "1024085963293",
  appId: "1:1024085963293:web:82a00bd585e3fbf4d00cf4",
  measurementId: "G-SP0XY1XD28"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { app, auth }