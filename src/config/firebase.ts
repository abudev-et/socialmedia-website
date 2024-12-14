// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics"
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { useSignInWithApple } from "react-firebase-hooks/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQXXlD108fBZaS2HUCH6UpNJv3DFY0Jow",
  authDomain: "react-sm-project-c3edc.firebaseapp.com",
  projectId: "react-sm-project-c3edc",
  storageBucket: "react-sm-project-c3edc.firebasestorage.app",
  messagingSenderId: "115183119090",
  appId: "1:115183119090:web:ab510e72c3b1c869fdfe6b",
  measurementId: "G-M90BX7CLWC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)