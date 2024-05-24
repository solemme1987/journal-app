// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite' 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJPfnbKl7NUWVcKyuzVgM0GJclNg4ckV4",
  authDomain: "journal-app-cd5a8.firebaseapp.com",
  projectId: "journal-app-cd5a8",
  storageBucket: "journal-app-cd5a8.appspot.com",
  messagingSenderId: "671979606074",
  appId: "1:671979606074:web:a1a2e74d1a9a4979ebe503"
};

// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig)
export const FirebaseAuth = getAuth(FirebaseApp)
export const FirebaseDB   = getFirestore(FirebaseApp)