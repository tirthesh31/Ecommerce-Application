// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Use the full Firestore library

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5Jjlb_iugyd3Dj4Z93gn8ehibTrp2c4Y",
  authDomain: "business-listing-app-48654.firebaseapp.com",
  projectId: "business-listing-app-48654",
  storageBucket: "business-listing-app-48654.appspot.com",
  messagingSenderId: "548581487230",
  appId: "1:548581487230:web:c09768f1fe895b3afbde2f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
