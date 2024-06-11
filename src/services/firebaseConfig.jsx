import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBNgyCHKQAIJ_tdDBaD3BNhc6TiOOWqZ8c",
  authDomain: "budgettracker-cf455.firebaseapp.com",
  projectId: "budgettracker-cf455",
  storageBucket: "budgettracker-cf455.appspot.com",
  messagingSenderId: "865236636",
  appId: "1:865236636:web:8a7e4d3870799170059f59",
  measurementId: "G-H8SDM3LWWH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const firestore = getFirestore(app);