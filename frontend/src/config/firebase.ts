// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCk-4nqBGCl-6iH0S1SSXI3iHAsqudAS9Q",
  authDomain: "gaia-ionic.firebaseapp.com",
  projectId: "gaia-ionic",
  storageBucket: "gaia-ionic.firebasestorage.app",
  messagingSenderId: "604424919258",
  appId: "1:604424919258:web:f56ad24adc01bf32d2ede3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getAuth(app);
