// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpHEFvkGakHb4gU1SKiYcMhP1PU_Rz4wM",
  authDomain: "travel-club-666.firebaseapp.com",
  projectId: "travel-club-666",
  storageBucket: "travel-club-666.appspot.com",
  messagingSenderId: "522580326624",
  appId: "1:522580326624:web:dc3b85cbbcbf423149b885",
  measurementId: "G-ZTV634GCQB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
