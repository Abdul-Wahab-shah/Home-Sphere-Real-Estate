// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: "mern-estate-1d95f.firebaseapp.com",
  projectId: "mern-estate-1d95f",
  storageBucket: "mern-estate-1d95f.appspot.com",
  messagingSenderId: "1098806249783",
  appId: "1:1098806249783:web:086ac91620cb2ed1fb72b2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);