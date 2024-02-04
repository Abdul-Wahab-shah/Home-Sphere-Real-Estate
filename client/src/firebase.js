
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCw6b38ykrNy_GpkTSMqFwdMAjYc3V9G7A",
  authDomain: "mern-estate-1d95f.firebaseapp.com",
  projectId: "mern-estate-1d95f",
  storageBucket: "mern-estate-1d95f.appspot.com",
  messagingSenderId: "1098806249783",
  appId: "1:1098806249783:web:086ac91620cb2ed1fb72b2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);