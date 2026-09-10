import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyACtDBP1lYYnjK1ComumsLXae7XlTrUR_k",
  authDomain: "portafolio-brandon-daza.firebaseapp.com",
  projectId: "portafolio-brandon-daza",
  storageBucket: "portafolio-brandon-daza.firebasestorage.app",
  messagingSenderId: "982333994404",
  appId: "1:982333994404:web:2b177f19264ac7f81ffd31",
  measurementId: "G-JC80EFXL8B",
  databaseURL: "https://portafolio-brandon-daza-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);
export const auth = getAuth(app);
