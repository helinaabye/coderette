// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCsMRaPYwXl-TTuntMMLLoGcN-_06ubBo",
  authDomain: "coderette-f6da7.firebaseapp.com",
  projectId: "coderette-f6da7",
  storageBucket: "coderette-f6da7.appspot.com",
  messagingSenderId: "701438165360",
  appId: "1:701438165360:web:f71c2c580f4a03cf968fb5",
  measurementId: "G-TKZ5DL4NJL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);