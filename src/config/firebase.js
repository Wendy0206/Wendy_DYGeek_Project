// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnQpK7FgJjKXT01it81VQ2pX72Xnqguvo",
  authDomain: "wendydonleypierre.firebaseapp.com",
  projectId: "wendydonleypierre",
  storageBucket: "wendydonleypierre.appspot.com",
  messagingSenderId: "1009003170815",
  appId: "1:1009003170815:web:57f8d2f84ba0bc9a0b75ca",
  measurementId: "G-LLP1JXV503"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);